# Symphony Unbound API

API ini digunakan untuk mengelola akun pengguna dan progres dalam game Symphony Unbound, termasuk login, register, ending, dan jumlah butterfly.

---

## Endpoint

---

- `POST /api/register`
  - Deskripsi: Mendaftarkan akun baru.
  - Body (JSON):
    ```json
    {
      "username": "player1",
      "email": "player1@example.com",
      "password": "your_password"
    }
    ```
  - Response:
    ```json
    {
      "message": "User registered"
    }
    ```

---

- `POST /api/login`
  - Deskripsi: Login user dan mendapatkan token serta data user.
  - Body (JSON):
    ```json
    {
      "email": "player1@example.com",
      "password": "your_password"
    }
    ```
  - Response:
    ```json
    {
      "token": "jwt_token_here",
      "user": {
        "_id": "userId",
        "username": "player1",
        "email": "player1@example.com",
        "ending_1": false,
        "ending_2": false,
        "ending_3": false,
        "butterfly": 0
      }
    }
    ```

---

- `POST /api/logout`
  - Deskripsi: Logout user. (Penghapusan token dilakukan di sisi frontend)
  - Response:
    ```json
    {
      "message": "Logged out (client-side token deletion expected)"
    }
    ```

---

- `PUT /api/add-ending`
  - Deskripsi: Menambahkan salah satu ending ke user.
  - Body (JSON):
    ```json
    {
      "userId": "userId_here",
      "endingNumber": 1
    }
    ```
  - Response:
    ```json
    {
      "message": "Ending 1 unlocked"
    }
    ```

---

- `GET /api/ending/:userId`
  - Deskripsi: Mengambil status semua ending user.
  - Response:
    ```json
    {
      "ending_1": true,
      "ending_2": false,
      "ending_3": false
    }
    ```

---

- `GET /api/user/:userId`
  - Deskripsi: Mendapatkan data user berdasarkan ID.
  - Response:
    ```json
    {
      "_id": "userId",
      "username": "player1",
      "email": "player1@example.com",
      "ending_1": true,
      "ending_2": false,
      "ending_3": false,
      "butterfly": 2
    }
    ```

---

- `PUT /api/add-butterfly`
  - Deskripsi: Menambahkan 1 ke jumlah butterfly user.
  - Body (JSON):
    ```json
    {
      "userId": "userId_here"
    }
    ```
  - Response:
    ```json
    {
      "butterfly": 3
    }
    ```

---

## Error Response (Umum)

```json
{
  "error": "Error message here"
}
