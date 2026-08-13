from app.models.configuracion import Configuracion
from app.models.dispositivo import Dispositivo
from app.models.sesion_dispositivo import SesionDispositivo


def test_configuracion_esta_relacionada_con_usuario_y_no_con_dispositivo():
    columnas = Configuracion.__table__.columns.keys()

    assert "id_usuario_fk" in columnas
    assert "id_dispositivo_fk" not in columnas


def test_dispositivo_no_tiene_propietario_directo_y_existe_sesion_dispositivo():
    columnas_dispositivo = Dispositivo.__table__.columns.keys()

    assert "id_usuario_fk" not in columnas_dispositivo
    assert SesionDispositivo.__tablename__ == "sesiones_dispositivo"
