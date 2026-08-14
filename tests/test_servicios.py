from datetime import date, timedelta

import pytest

from app.models.configuracion import Configuracion
from app.models.rol import Rol
from app.models.usuario import Usuario
from app.schemas.autenticacion_esquema import LoginRequest
from app.schemas.configuracion_esquema import ConfiguracionActualizar, ConfiguracionCrear
from app.schemas.usuario_esquema import UsuarioActualizacion, UsuarioRegistro
from app.services.autenticacion_servicio import AutenticacionServicio
from app.services.configuracion_servicio import ConfiguracionServicio
from app.services.usuario_servicio import UsuarioServicio


def crear_rol(db_session, id_rol=1):
    rol = Rol(id_rol=id_rol, nombre="Usuario", estado=True)
    db_session.add(rol)
    db_session.commit()
    return rol


def crear_usuario_db(db_session, email="usuario@demo.com"):
    crear_rol(db_session)
    usuario = Usuario(
        id_rol_fk=1,
        nombre="Ana",
        apellido="Pérez",
        fecha_nacimiento=date(1990, 5, 20),
        email=email,
        password_hash="hash-falso",
        estado=True,
    )
    db_session.add(usuario)
    db_session.commit()
    return usuario


def test_autenticacion_servicio_registro_crea_usuario_y_configuracion(db_session):
    crear_rol(db_session)
    servicio = AutenticacionServicio(db_session)

    datos = UsuarioRegistro(
        nombre="Pedro",
        apellido="López",
        fecha_nacimiento=date(1994, 2, 11),
        email="pedro@demo.com",
        password="Password1!",
    )

    respuesta = servicio.registrar(datos)

    assert respuesta.email == "pedro@demo.com"
    assert respuesta.id_rol_fk == 1
    assert db_session.query(Usuario).filter_by(email="pedro@demo.com").count() == 1
    assert db_session.query(Configuracion).filter_by(id_usuario_fk=respuesta.id_usuario).count() == 1


def test_autenticacion_servicio_login_y_refresh_token(db_session):
    crear_rol(db_session)
    servicio = AutenticacionServicio(db_session)

    datos = UsuarioRegistro(
        nombre="Laura",
        apellido="Mora",
        fecha_nacimiento=date(1988, 8, 12),
        email="laura@demo.com",
        password="Password1!",
    )
    servicio.registrar(datos)

    tokens = servicio.iniciar_sesion(LoginRequest(email="laura@demo.com", password="Password1!"))

    assert tokens.access_token
    assert tokens.refresh_token

    tokens_nuevos = servicio.refrescar_sesion(tokens.refresh_token)

    assert tokens_nuevos.access_token != tokens.access_token
    assert tokens_nuevos.refresh_token != tokens.refresh_token


def test_autenticacion_servicio_login_rechaza_credenciales_invalidas(db_session):
    crear_rol(db_session)
    servicio = AutenticacionServicio(db_session)

    with pytest.raises(ValueError, match="Credenciales incorrectas"):
        servicio.iniciar_sesion(LoginRequest(email="no@existe.com", password="Password1!"))

    usuario = Usuario(
        id_rol_fk=1,
        nombre="Lucía",
        apellido="Ruiz",
        fecha_nacimiento=date(2000, 1, 1),
        email="lucia@demo.com",
        password_hash="hash-falso",
        estado=True,
    )
    db_session.add(usuario)
    db_session.commit()

    with pytest.raises(ValueError, match="Credenciales incorrectas"):
        servicio.iniciar_sesion(LoginRequest(email="lucia@demo.com", password="PasswordWrong1!"))


def test_usuario_servicio_actualiza_y_obtiene_usuario(db_session):
    usuario = crear_usuario_db(db_session, "usuario_actualizar@demo.com")
    servicio = UsuarioServicio(db_session)

    actualizado = servicio.actualizar_usuario(
        usuario.id_usuario,
        UsuarioActualizacion(nombre="Nuevo nombre", email="nuevo@demo.com"),
    )

    assert actualizado.nombre == "Nuevo nombre"
    assert actualizado.email == "nuevo@demo.com"
    assert servicio.obtener_usuario(usuario.id_usuario).nombre == "Nuevo nombre"


def test_usuario_servicio_lanza_error_si_usuario_no_existe(db_session):
    servicio = UsuarioServicio(db_session)

    with pytest.raises(ValueError, match="El usuario no existe"):
        servicio.obtener_usuario("00000000-0000-0000-0000-000000000001")


def test_configuracion_servicio_crea_actualiza_y_elimina(db_session):
    usuario = crear_usuario_db(db_session, "config@demo.com")
    servicio = ConfiguracionServicio(db_session)

    creada = servicio.crear_configuracion(
        ConfiguracionCrear(id_usuario_fk=usuario.id_usuario, volumen=70, auto_conexion=True)
    )

    assert creada.volumen == 70
    assert creada.auto_conexion is True

    actualizada = servicio.actualizar_configuracion(
        usuario.id_usuario,
        ConfiguracionActualizar(volumen=90, auto_conexion=False),
    )

    assert actualizada.volumen == 90
    assert actualizada.auto_conexion is False

    servicio.eliminar_configuracion(usuario.id_usuario)

    with pytest.raises(ValueError, match="La configuración no existe para este usuario"):
        servicio.obtener_por_usuario(usuario.id_usuario)


def test_configuracion_servicio_rechaza_registro_doble_para_mismo_usuario(db_session):
    usuario = crear_usuario_db(db_session, "dupla@demo.com")
    servicio = ConfiguracionServicio(db_session)

    servicio.crear_configuracion(
        ConfiguracionCrear(id_usuario_fk=usuario.id_usuario, volumen=50, auto_conexion=False)
    )

    with pytest.raises(ValueError, match="El usuario ya tiene configuración"):
        servicio.crear_configuracion(
            ConfiguracionCrear(id_usuario_fk=usuario.id_usuario, volumen=80, auto_conexion=True)
        )
