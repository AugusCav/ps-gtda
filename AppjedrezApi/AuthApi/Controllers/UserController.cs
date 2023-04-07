using AuthApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
            return BadRequest();

        var user = await _authContext.Usuarios
            .FirstOrDefaultAsync(x => x.Usuario1 == userObj.Usuario1 && x.Clave == userObj.Clave);
        if (user == null)
            return NotFound(new { Message = "User Not Found" });

        return Ok(new
        {
            Message = "Login Success"
        });
    }

    [HttpPost("register")]
    public async Task<IActionResult> RegisterUser([FromBody] Usuario userObj)
    {
        if (userObj == null)
            return BadRequest();

        userObj.Id = Guid.NewGuid();
        await _authContext.Usuarios.AddAsync(userObj);
        await _authContext.SaveChangesAsync();
        return Ok(new
        {
            Message = "Register Success"
        });
    }
}
