# API Repostera

## Descripción
La **API Repostera** es una solución diseñada para gestionar pedidos, usuarios y tareas dentro de un sistema de repostería. Ofrece una interfaz robusta para la administración de pedidos y tareas de empleados, junto con un sistema de autenticación y autorización basado en JWT.

### Funcionalidades principales:
- **Autenticación y autorización**: Inicio de sesión y manejo de roles (ADMIN y VENTAS).
- **Gestión de pedidos**: CRUD completo, búsqueda avanzada y control de estados (finalizado o eliminado).
- **Gestión de tareas**: CRUD completo para los empleados, con estados de finalización y eliminación.
- **Búsquedas dinámicas**: Encuentra pedidos mediante términos específicos.

URL base: https://api-repostera.onrender.com/


## Endpoints

 1. **Autenticacion**.
	 **Login**
 
 - **Descripción**: Autentica a un usuario y devuelve un token JWT.
 - **URL**: `auth/login`
 - **Método**: `POST`
 - **Body (JSON)**:
    `{ "email": "test1@gmail.com",
	 "password": "123456"
   }`
---
2. **Usuarios**
	#### Crear Usuario
	-   **Descripción**: Crea un nuevo usuario con roles ADMIN o VENTAS.
	-   **URL**: `users`
	-   **Método**: `POST`
	-   **Body (JSON)**:
	 `{ "name": "Alejandra", "email": "Alejandra@gmail.com", "password": "123456", "role": "ADMIN_ROLE" }`
---


 3. **Pedidos**
	 **Crear Pedido**
	-   **Descripción**: Agrega un nuevo pedido al sistema. **Todos los campos son obligatorios** en la creación.
    -   **URL**: `orders`
    -   **Método**: `POST`
    -   **Headers**: `x-token`: `<JWT Token>`
    -   **Body (JSON)**:
     `{ "name": "Juan Carlos Martinez", "date": "20/11/2024", "kilos": "2", "notes": "pastel", "product": "bizcochuelo", "advance": 458, "phone": "2932534436", "hour": "22" }`

**Campos del body**:

-   `name` (string): Nombre del cliente.
-   `date` (string): Fecha del pedido.
-   `kilos` (string): Cantidad en kilos.
-   `notes` (string): Notas adicionales.
-   `product` (string): Producto solicitado.
-   `advance` (number): Monto de anticipo.
-   `phone` (string): Teléfono del cliente.
-   `hour` (string): Hora del pedido.

---

#### Actualizar Pedido

-   **Descripción**: Modifica un pedido existente. **Todos los campos son opcionales**, es decir, el body puede contener solo los campos que se deseen actualizar.
    
	-   **URL**: `orders/:id`
	-   **Método**: `PUT`
	-   **Headers**: `x-token`: `<JWT Token>`
	-   **Body (JSON)**:
	`{ "name": "Nuevo nombre (opcional)", "date": "Nueva fecha (opcional)", "kilos": "Nueva cantidad en kilos (opcional)", "notes": "Nuevas notas (opcional)", "product": "Nuevo producto (opcional)", "advance": 500, "phone": "Nuevo teléfono (opcional)", "hour": "Nueva hora (opcional)" }`
	
	**Nota**: Si no se incluye un campo en el body, el valor existente permanecerá sin cambios.

---

#### Obtener Pedidos

-   **Descripción**: Lista todos los pedidos.
-   **URL**: `orders`
-   **Método**: `GET`
-   **Headers**: `x-token`: `<JWT Token>`
---

#### Obtener Pedido por ID

-   **Descripción**: Devuelve los detalles de un pedido específico.
-   **URL**: `orders/order/:id`
-   **Método**: `GET`
-   **Headers**: `x-token`: `<JWT Token>`
---

#### Eliminar Pedido (lógico)

-   **Descripción**: Marca un pedido como eliminado.
-   **URL**: `orders/delete/:id`
-   **Método**: `PUT`
-   **Headers**: `x-token`: `<JWT Token>`
---
#### Finalizar Pedido

-   **Descripción**: Marca un pedido como finalizado.
-   **URL**: `orders/finished/:id`
-   **Método**: `PUT`
-   **Headers**: `x-token`: `<JWT Token>`
---
### 4. **Tareas**

#### Crear Tarea

- **Descripción** : Crea una nueva tarea para los empleados.
	- **URL**: `tasks`
	- **Método**: `POST`
	-  **Headers**: `x-token`: `<JWT Token>`
	-   **Body (JSON)**:
	`{
  "title": "Envasar dulce de leche",
  "description": "En potes de medio kilo y de un kilo."
}`

---
#### Obtener Tareas

-   **Descripción**: Lista todas las tareas activas.
-   **URL**: `tasks`
-   **Método**: `GET`
-   **Headers**: `x-token`: `<JWT Token>`
---
#### Actualizar Tarea

-   **Descripción**: Modifica una tarea existente.
	-   **URL**: `tasks/:id`
	-   **Método**: `PUT`
	-   **Headers**: `x-token`: `<JWT Token>`
	-   **Body (JSON)**:
    `{
  "title": "Nuevo título (opcional)",
  "description": "Nueva descripción (opcional)"
}`
---
#### Eliminar Tarea (lógico)

-   **Descripción**: Marca una tarea como eliminada.
	-   **URL**: `tasks/delete/:id`
	-   **Método**: `PUT`
	-   **Headers**: `x-token`: `<JWT Token>`
	---
### 5. **Búsquedas**

#### Buscar Pedidos

-   **Descripción**: Busca pedidos mediante un término.
	-   **URL**: `search/orders/:term`
	-   **Método**: `GET`
	-   **Headers**: `x-token`: `<JWT Token>`
---

