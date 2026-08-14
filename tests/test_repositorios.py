from datetime import datetime, timedelta, timezone

from app.models.configuracion import Configuracion
from app.models.rol import Rol
from app.models.sesion import Sesion
from app.models.usuario import Usuario
from app.repositories.configuracion_repositorio import ConfiguracionRepositorio
from app.repositories.sesion_repositorio import SesionRepositorio
from app.repositories.usuario_repositorio import UsuarioRepositorio


def crear_usuario(db_session, email="usuario@test.com"):
    rol = Rol(id_rol=1, nombre="Usuario", estado=True)
    usuario = Usuario(
        id_rol_fk=1,
        nombre="Test",
        apellido="User",
        fecha_nacimiento="1990-01-01",
        email=email,
        password_hash="hash-test",
        estado=True,
    )
    db_session.add(rol)
    db_session.add(usuario)
    db_session.commit()
    return usuario


def test_usuario_repositorio_busca_por_email_y_lista(db_session):
    usuario = crear_usuario(db_session, "email@demo.com")
    repositorio = UsuarioRepositorio(db_session)

    assert repositorio.buscar_por_email("email@demo.com") is not None
    assert repositorio.buscar_por_id(usuario.id_usuario) == usuario
    assert len(repositorio.listar()) == 1


def test_configuracion_repositorio_busca_por_usuario(db_session):
    usuario = crear_usuario(db_session, "config@demo.com")
    configuracion = Configuracion(
        id_usuario_fk=usuario.id_usuario,
        volumen=60,
        auto_conexion=True,
    )
    db_session.add(configuracion)
    db_session.commit()

    repositorio = ConfiguracionRepositorio(db_session)

    assert repositorio.buscar_por_usuario(usuario.id_usuario) == configuracion
    assert len(repositorio.listar()) == 1


def test_sesion_repositorio_filtra_sesiones_activas(db_session):
    usuario = crear_usuario(db_session, "sesion@demo.com")
    ahora = datetime.now(timezone.utc)

    activa = Sesion(
        id_usuario_fk=usuario.id_usuario,
        token_hash="hash-activa",
        fecha_expiracion=ahora + timedelta(days=2),
        ultimo_acceso=ahora,
    )
    revocada = Sesion(
        id_usuario_fk=usuario.id_usuario,
        token_hash="hash-revocada",
        fecha_expiracion=ahora + timedelta(days=2),
        ultimo_acceso=ahora,
        revocada=True,
    )
    expirada = Sesion(
        id_usuario_fk=usuario.id_usuario,
        token_hash="hash-expirada",
        fecha_expiracion=ahora - timedelta(days=1),
        ultimo_acceso=ahora,
    )

    db_session.add_all([activa, revocada, expirada])
    db_session.commit()

    sesiones_activas = SesionRepositorio(db_session).buscar_sesiones_activas()

    assert len(sesiones_activas) == 1
    assert sesiones_activas[0].id_sesion == activa.id_sesion
