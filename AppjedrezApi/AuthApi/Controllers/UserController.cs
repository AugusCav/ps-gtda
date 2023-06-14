using System.Text.RegularExpressions;
using System.Text;
using AuthApi.Helpers;
using AuthApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;


namespace AuthApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly Context.AppDbContext _authContext;
    public UserController(Context.AppDbContext dbContext)
    {
        _authContext = dbContext;
    }

    [HttpPost("authenticate")]
    public async Task<IActionResult> Authenticate([FromBody] Usuario userObj)
    {
        if (userObj == null)
            return BadRequest(new { Message = "Usuario o contraseña no coinciden" });

        var user = await _authContext.Usuarios
            .Include(u => u.IdRolUsuarioNavigation)
            .FirstOrDefaultAsync(x => x.NombreUsuario == userObj.NombreUsuario);

        if (user == null)
            return NotFound(new { Message = "Usuario no encontrado" });

        if (!PasswordHasher.VerifyPassword(userObj.Clave, user.Clave))
            return BadRequest(new { Message = "La contraseña es incorrecta" });


        user.Token = CreateJwt(user);

        return Ok(new
        {
            Token = user.Token,
            Message = "Inicio de sesión exitoso"
        });
    }

    [HttpPost("register")]
    public async Task<IActionResult> RegisterUser([FromBody] Usuario userObj)
    {
        if (userObj == null)
            return BadRequest();

        //Check nombre usuario
        if (await CheckUsernameExistAsync(userObj.NombreUsuario))
        {
            return BadRequest(new { Message = "El nombre de usuario ya existe" });
        }

        //Check email
        if (await CheckEmailExistAsync(userObj.Email))
            return BadRequest(new { Message = "El email ya está registrado" });

        //Check clave
        var clave = CheckPasswordStrength(userObj.Clave);
        if (!string.IsNullOrEmpty(clave))
            return BadRequest(new { Message = clave.ToString() });

        userObj.Id = Guid.NewGuid();
        userObj.Clave = PasswordHasher.HashPassword(userObj.Clave);
        userObj.Token = "";
        await _authContext.Usuarios.AddAsync(userObj);
        await _authContext.SaveChangesAsync();
        return Ok(new
        {
            Message = "Registro exitoso"
        });
    }

    [HttpGet("{idUser}")]
    public async Task<ActionResult<Usuario>> GetUser(Guid idUser)
    {
        var usuario = await _authContext.Usuarios
            .Include(u => u.IdRolUsuarioNavigation)
            .Where(u => u.Id == idUser)
            .Select(u => new
            {
                Id = u.Id,
                NombreUsuario = u.NombreUsuario,
                Nombres = u.Nombres,
                Apellido = u.Apellido,
                Email = u.Email,
                Telefono = u.Telefono,
                IdRolUsuario = u.IdRolUsuario,
                Elo = u.Elo,
                Rol = new
                {
                    Rol = u.IdRolUsuarioNavigation.Rol
                }
            })
            .FirstOrDefaultAsync();

        return Ok(usuario);
    }

    private Task<bool> CheckUsernameExistAsync(string nombreUsuario)
     => _authContext.Usuarios.AnyAsync(x => x.NombreUsuario == nombreUsuario);

    private Task<bool> CheckEmailExistAsync(string email)
    => _authContext.Usuarios.AnyAsync(x => x.Email == email);

    private string CheckPasswordStrength(string clave)
    {
        StringBuilder sb = new StringBuilder();
        if (clave.Length < 8)
            sb.Append("La longitud mínima de la contraseña debería ser 8" + Environment.NewLine);

        if ((Regex.IsMatch(clave, "[a-z]") && Regex.IsMatch(clave, "[A-Z]")
            && Regex.IsMatch(clave, "[0-9]")))
            sb.Append("La contraseña debe ser alfanumérica" + Environment.NewLine);

        if (!Regex.IsMatch(clave, "[!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~]"))
            sb.Append("La contraseña debería incluir caracteres especiales" + Environment.NewLine);

        return sb.ToString();
    }

    private string CreateJwt(Usuario usuario)
    {
        var jwtTokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes("veryverysecret.....");
        var identity = new ClaimsIdentity(new Claim[]
        {
            new Claim(ClaimTypes.NameIdentifier, usuario.Id.ToString()),
            new Claim(ClaimTypes.Role, usuario.IdRolUsuarioNavigation.Rol),
            new Claim(ClaimTypes.Name, $"{usuario.Nombres} {usuario.Apellido}")
        });
        var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

        var tokenDesciptor = new SecurityTokenDescriptor
        {
            Subject = identity,
            Expires = DateTime.Now.AddDays(1),
            SigningCredentials = credentials
        };

        var token = jwtTokenHandler.CreateToken(tokenDesciptor);
        return jwtTokenHandler.WriteToken(token);
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<Usuario>> GetAllUsers()
    {
        return Ok(await _authContext.Usuarios.ToListAsync());
    }
}
