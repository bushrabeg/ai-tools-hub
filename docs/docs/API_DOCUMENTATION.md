# 📚 AI Tools Hub - API Documentation

**Base URL**: `http://localhost:5000/api`

---

## 🔐 Authentication

All protected endpoints require JWT token in header:
```
Authorization: Bearer <token>
```

---

## 🛠️ Tools Endpoints

### Get All Tools
```
GET /tools
```
**Query Parameters:**
- `page` (optional): Page number
- - `limit` (optional): Items per page
 
  - **Response:**
  - ```json
    {
      "success": true,
      "data": [...],
      "total": 10
    }
    ```

    ### Get Tool by ID
    ```
    GET /tools/:id
    ```

    ### Search Tools
    ```
    GET /tools/search?q=chatgpt&category=LLM&pricing_type=freemium
    ```

    ### Create Tool (Admin)
    ```
    POST /tools
    Content-Type: application/json
    Authorization: Bearer <token>

    {
      "name": "ChatGPT",
      "description": "AI tool",
      "category": "LLM",
      "pricing_type": "freemium",
      "pricing": "Free - $20/month",
      "website_url": "https://chat.openai.com"
    }
    ```

    ### Update Tool (Admin)
    ```
    PUT /tools/:id
    Authorization: Bearer <token>
    ```

    ### Delete Tool (Admin)
    ```
    DELETE /tools/:id
    Authorization: Bearer <token>
    ```

    ### Get Trending Tools
    ```
    GET /tools/trending?limit=10
    ```

    ---

    ## 📰 News Endpoints

    ### Get Latest News
    ```
    GET /news?page=1&limit=20&sort=newest
    ```

    ### Get News by Category
    ```
    GET /news/category/LLM
    ```

    ### Get Trending News
    ```
    GET /news/trending?limit=15&importance=high
    ```

    ### Create News Item (Admin)
    ```
    POST /news
    Authorization: Bearer <token>

    {
      "title": "New AI Tool Released",
      "description": "Description here",
      "category": "LLM",
      "importance": "high",
      "news_source": "OpenAI Blog",
      "news_url": "https://example.com"
    }
    ```

    ### Categorize News with Claude AI
    ```
    POST /news/:id/categorize
    Authorization: Bearer <token>
    ```

    ---

    ## 👤 Auth Endpoints

    ### Register
    ```
    POST /auth/register
    Content-Type: application/json

    {
      "email": "user@example.com",
      "password": "secure_password",
      "username": "john_doe"
    }
    ```

    **Response:**
    ```json
    {
      "success": true,
      "message": "User registered successfully",
      "user": {
        "id": 1,
        "email": "user@example.com",
        "username": "john_doe"
      }
    }
    ```

    ### Login
    ```
    POST /auth/login
    Content-Type: application/json

    {
      "email": "user@example.com",
      "password": "secure_password"
    }
    ```

    **Response:**
    ```json
    {
      "success": true,
      "token": "eyJhbGciOiJIUzI1NiIs...",
      "user": {...}
    }
    ```

    ### Get Current User
    ```
    GET /auth/me
    Authorization: Bearer <token>
    ```

    ### Update Profile
    ```
    PUT /auth/profile
    Authorization: Bearer <token>

    {
      "username": "new_username",
      "bio": "My bio"
    }
    ```

    ### Change Password
    ```
    POST /auth/change-password
    Authorization: Bearer <token>

    {
      "oldPassword": "current_password",
      "newPassword": "new_password"
    }
    ```

    ### Verify Token
    ```
    POST /auth/verify-token

    {
      "token": "eyJhbGciOiJIUzI1NiIs..."
    }
    ```

    ---

    ## ⭐ Reviews Endpoints

    ### Get Reviews for Tool
    ```
    GET /reviews/tool/:toolId?page=1&limit=10&sort=recent
    ```

    ### Get Single Review
    ```
    GET /reviews/:id
    ```

    ### Create Review
    ```
    POST /reviews
    Authorization: Bearer <token>

    {
      "toolId": 1,
      "rating": 5,
      "title": "Amazing tool!",
      "review_text": "This tool is fantastic..."
    }
    ```

    **Note:** Rating must be 1-5

    ### Update Review
    ```
    PUT /reviews/:id
    Authorization: Bearer <token>

    {
      "rating": 4,
      "title": "Updated review",
      "review_text": "Updated text..."
    }
    ```

    ### Delete Review
    ```
    DELETE /reviews/:id
    Authorization: Bearer <token>
    ```

    ### Mark as Helpful
    ```
    POST /reviews/:id/helpful
    Authorization: Bearer <token>
    ```

    ### Get Rating Summary
    ```
    GET /reviews/rating/summary/:toolId
    ```

    **Response:**
    ```json
    {
      "toolId": 1,
      "average_rating": 4.5,
      "total_reviews": 125,
      "breakdown": {
        "5": 85,
        "4": 25,
        "3": 10,
        "2": 3,
        "1": 2
      }
    }
    ```

    ---

    ## 🔍 Categories

    Available AI tool categories:
    - `LLM` - Large Language Models
    - - `Video Generation` - Video creation tools
      - - `Voice` - Voice and audio tools
        - - `Image Generation` - Image creation tools
          - - `Data Analysis` - Data processing tools
            - - `Search` - Search and RAG tools
              - - `Creative` - Creative tools
                - - `Security` - Security tools
                 
                  - ---

                  ## 📊 Status Endpoints

                  ### Health Check
                  ```
                  GET /health
                  ```

                  ### API Status
                  ```
                  GET /status
                  ```

                  ---

                  ## ⚠️ Error Responses

                  All errors follow this format:
                  ```json
                  {
                    "success": false,
                    "error": "Error message",
                    "message": "Detailed message (optional)"
                  }
                  ```

                  **Status Codes:**
                  - `200` - Success
                  - - `201` - Created
                    - - `400` - Bad Request
                      - - `401` - Unauthorized
                        - - `403` - Forbidden
                          - - `404` - Not Found
                            - - `500` - Server Error
                             
                              - ---

                              ## 🚀 Testing with cURL

                              ```bash
                              # Get all tools
                              curl http://localhost:5000/api/tools

                              # Login
                              curl -X POST http://localhost:5000/api/auth/login \
                                -H "Content-Type: application/json" \
                                -d '{"email":"user@example.com","password":"password"}'

                              # Create review with token
                              curl -X POST http://localhost:5000/api/reviews \
                                -H "Authorization: Bearer YOUR_TOKEN" \
                                -H "Content-Type: application/json" \
                                -d '{"toolId":1,"rating":5,"title":"Great!","review_text":"Awesome tool"}'
                              ```

                              ---

                              **Last Updated**: Feb 15, 2026
