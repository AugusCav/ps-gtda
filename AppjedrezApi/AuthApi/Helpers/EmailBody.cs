namespace AuthApi.Helpers;

public static class EmailBody
{
    public static string EmailStringBody(string email, string emailToken)
    {
        return $@"<html>
  <head></head>
  <body
    style=""margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif""
  >
    <div
      style=""
        height: auto;
        background: linear-gradient(to top, #df5366 50%, #9c1c2d 90%) no-repeat;
        width: 400px;
        padding: 30px;
      ""
    >
      <div>
        <div> 
          <h1>Reiniciar contraseña</h1>
          <hr />
          <p>
            Usted ha recibido este e-mail porque solicitó un reinicio de
            contraseña para su cuenta en ChessTourney
          </p>
          <p>
            Por favor, clickee el botón de abajo para elegir una nueva
            contraseña
          </p>
          <a
            href=""http://localhost:4200/user/reset?email={email}&code={emailToken}""
            target=""_blank""
            style=""
              background: #ee0d2b;
              padding: 10px;
              border: none;
              color: white;
              border-radius: 4px;
              display: block;
              margin: 0 auto;
              width: 50%;
              text-align: center;
              text-decoration: none;
            ""
            >Reiniciar Contraseña</a
          >
          <p>
            Atentamente, <br /><br />
            ChessTourney
          </p>
        </div>
      </div>
    </div>
  </body>
</html>
";
    }
    public static string EmailStringBodyIns(string email, string nombreTorneo)
    {
        return $@"<html>
  <head></head>
  <body
    style=""margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif""
  >
    <div
      style=""
        height: auto;
        background: linear-gradient(to top, #df5366 50%, #d41731 90%) no-repeat;
        width: 400px;
        padding: 30px;
      ""
    >
      <div>
        <div> 
          <h1>Inscripción Aprobada</h1>
          <hr />
          <p>
            Usted ha recibido este e-mail porque su solicitud para inscribirse al torneo '{nombreTorneo}' fue aceptada.
          </p>
          <p>
            Atentamente, <br /><br />
            ChessTourney
          </p>
        </div>
      </div>
    </div>
  </body>
</html>
";
    }
}
