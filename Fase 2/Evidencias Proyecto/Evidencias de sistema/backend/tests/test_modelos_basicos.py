import uuid
from datetime import date, datetime

from app.models.configuracion import Configuracion
from app.models.dispositivo import Dispositivo
from app.models.rol import Rol
from app.models.sesion import Sesion
from app.models.sesion_dispositivo import SesionDispositivo
from app.models.usuario import Usuario


def test_modelos_tienen_tablas_y_campos_esperados():
    assert Usuario.__tablename__ == "usuarios"
    assert Rol.__tablename__ == "rol"
    assert Configuracion.__tablename__ == "configuracion"
    assert Sesion.__tablename__ == "sesiones"
    assert Dispositivo.__tablename__ == "dispositivos"
    assert SesionDispositivo.__tablename__ == "sesiones_dispositivo"

    assert "id_usuario" in Usuario.__table__.columns.keys()
    assert "id_rol_fk" in Usuario.__table__.columns.keys()
    assert "email" in Usuario.__table__.columns.keys()
    assert "volumen" in Configuracion.__table__.columns.keys()
    assert "auto_conexion" in Configuracion.__table__.columns.keys()
    assert "token_hash" in Sesion.__table__.columns.keys()
    assert "numero_serie" in Dispositivo.__table__.columns.keys()


def test_modelos_pueden_crearse_con_instancias_minimas():
    usuario = Usuario(
        id_rol_fk=1,
        nombre="Marta",
        apellido="Luna",
        fecha_nacimiento=date(2001, 3, 14),
        email="marta@demo.com",
        password_hash="hash",
        estado=True,
    )
    configuracion = Configuracion(id_usuario_fk=uuid.uuid4(), volumen=55, auto_conexion=True)
    sesion = Sesion(
        id_usuario_fk=uuid.uuid4(),
        token_hash="token-hash",
        fecha_expiracion=datetime(2030, 1, 1, tzinfo=None),
        ultimo_acceso=datetime(2025, 1, 1, tzinfo=None),
    )
    dispositivo = Dispositivo(
        nombre="Camara 1",
        numero_serie="SERIE-001",
        version_firmware="1.0.0",
        estado_conexion="online",
    )

    assert usuario.email == "marta@demo.com"
    assert configuracion.volumen == 55
    assert sesion.token_hash == "token-hash"
    assert dispositivo.numero_serie == "SERIE-001"
