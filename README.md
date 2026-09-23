# AuraVisión_Capstone

# Se borran las copias antiguas
git rm -r frontend
git rm -r backend
git rm -r firmware
git commit -m "Removiendo copias antiguas"

# Para actualizar frontend desde el repo original
git subtree pull --prefix=frontend frontend main

# Para actualizar backend
git subtree pull --prefix=backend backend main

# Para actualizar firmware
git subtree pull --prefix=firmware firmware main

# Para subir cambios 
git push origin main
