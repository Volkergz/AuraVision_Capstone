from datetime import date
from uuid import uuid4

import pytest
from pydantic import ValidationError

from app.schemas.autenticacion_esquema import LoginRequest
from app.schemas.configuracion_esquema import ConfiguracionCrear
from app.schemas.usuario_esquema import UsuarioRegistro


def test_usuario_registro_rechaza_password_debil():
    with pytest.raises(ValidationError):
        UsuarioRegistro(
            nombre="Ana",
            apellido="García",
            fecha_nacimiento=date(1995, 4, 10),
            email="ana@example.com",
            password="password",
        )


def test_usuario_registro_valida_password_fuertes():
    usuario = UsuarioRegistro(
        nombre="Ana",
        apellido="García",
        fecha_nacimiento=date(1995, 4, 10),
        email="ana@example.com",
        password="Password1!",
    )

    assert usuario.email == "ana@example.com"
    assert usuario.password == "Password1!"


def test_configuracion_crear_rechaza_volumen_fuera_de_rango():
    with pytest.raises(ValidationError):
        ConfiguracionCrear(
            id_usuario_fk=uuid4(),
            volumen=101,
            auto_conexion=True,
        )


def test_login_request_acepta_email_y_password_validos():
    datos = LoginRequest(email="cliente@correo.com", password="123456")

    assert datos.email == "cliente@correo.com"
    assert datos.password == "123456"
