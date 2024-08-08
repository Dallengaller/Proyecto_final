# Resultado final.
# De forma local funciona correctamente, conecta a la base de datos y es posible registrar un usuario como tambien, agregar favoritos y eliminarlos.
# De forma desplegada, funciona frontend, backend con conexion exitoso (confirmacion en el log) y base de datos configurada. Pero de igual forma no lee los datos de la base,
# Al parecer es un problema con los direccionamientos de render, puesto que al levantar el servidor en vscode, desde render, la app funciona igual que de forma local.
# He dejado de la mejor forma funcionando.



# https://proyecto-final-2eg7.onrender.com
# Por el momento se esta resolviendo la conexion con la base de datos y backend en el deploy.
# Se ha creado una app en react.
# La app obtiene los datos de peliculas y series de la api desde el sitio OMDB.
# Se ha creado una variable de entorno para guardar las api_key.
# Se ha implementado
# 1 - Un log in y log out temporal (aun revisando redireccionamiento)
# 2 - Pagina principal con algunos datos de la api (temporal)
# 3 - Una vista Favoritos, que se obtienen al marcar como favoritos entrando al detalle del titulo
# 4 - Una vista de detalles que muestra más información. En esta vista se puede marcar un favorito y agregar al carrito.
# 5 - Una vista carrito de compras, previamente agregados.
# 6 - Los favoritos y lista del carrito se pueden eliminar desde sus respectivas vistas.
# 7 - Responsividad.
# El sitio aun esta en fase de prueba y es posible que modifique algunas funciones y/o caracteristicas, asi tambien como el diseño final.

# Creando Backend.
# Se ha creado un usuario de pruebas
# Prueba@mail.com / prueba123
# Se ha creado un servidor que inicia con node index.js 
# Se ha creado una base de datos para la tabla usuarios y se ha conectado a la app.
# Se ha agregado la logica para que los usuarios se registren y puedan hacer login dentro del sitio.
# Se ha creado seccion comentarios...
# Se ha implenetando una logica para generar precios a los titulos.
# Los titulos y vaolres se agregan a la base de datos.

# Conexion Base de datos.
# La app conecta con la base de datos, se pueden registrar usuarios y estos mismos pueden loguearse.
# usuario prueba: daniel@mail.com / prueba123
# Se ha agregado la funcion de favoritos en la BD.
# Se ha agragado un carrito de compras con funcion dinamica, calcula el total y recibe un mensaje de compra exitosa.

# Se ha hecho deploy del frontend, backend y base de datos
# Se ha integrado la aplicacion.

# Se esta trabajando en mejorar el diseno e implementacion de comentarios.

