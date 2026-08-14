import uuid

import pytest

from app.core.seguridad import (
    crear_access_token,
    crear_refresh_token,
    decodificar_access_token,
    decodificar_refresh_token,
    generar_password_hash,
    generar_refresh_token_hash,
    verificar_password,
    verificar_refresh_token,
)


def test_generar_y_verificar_password():
    password = "MiPassword123!"
    password_hash = generar_password_hash(password)

    assert password_hash != password
    assert verificar_password(password, password_hash) is True
    assert verificar_password("OtraPassword123!", password_hash) is False


def test_crear_y_decodificar_access_token():
    usuario_id = uuid.uuid4()
    sesion_id = uuid.uuid4()

    token = crear_access_token(usuario_id, sesion_id)
    payload = decodificar_access_token(token)

    assert payload["sub"] == str(usuario_id)
    assert payload["sid"] == str(sesion_id)
    assert payload["type"] == "access"


def test_crear_y_decodificar_refresh_token():
    usuario_id = uuid.uuid4()
    sesion_id = uuid.uuid4()

    token = crear_refresh_token(usuario_id, sesion_id)
    payload = decodificar_refresh_token(token)

    assert payload["sub"] == str(usuario_id)
    assert payload["sid"] == str(sesion_id)
    assert payload["type"] == "refresh"


def test_refresh_token_hash_verifica_igualdad():
    token = "refresh-token-de-prueba-123"
    token_hash = generar_refresh_token_hash(token)

    assert verificar_refresh_token(token, token_hash) is True
    assert verificar_refresh_token("otro-token", token_hash) is False


def test_decofificar_access_token_falla_si_no_es_access():
    refresh_token = crear_refresh_token(uuid.uuid4(), uuid.uuid4())

    with pytest.raises(ValueError):
        decodificar_access_token(refresh_token)
