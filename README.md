# ARTIVISM

The purspose of Artivism is to provide an environment where users can share and consult images and information about artistic activism actions happening around the world.

### User Stories

- **404** As an anon/user I can see a 404 page if I try toreach a page that does not exist so that I know is my fault.
- **Landing** As an anon I can see a landig page with a call to action phrase and button.
- **Signup** As an anon I can sign up in the platform so that I can start sharing posts and comment other users posts.
- **Login** As an user I can login to have acces to all posts info and my user info.
- **Logout** As a user I can logout from the platform.
- **Posts view** As an anon/user I can see the principal components of a post: images, location, theme, date, call to action url, a a brief extract of the article. As a user I can also access to de author of the post information (other posts) and the detail view of the post.
- **Search posts** As an anon/user I can search post about and specific theme, city or country.
- **Add post** As a user I can add a new post and share with the community.
- **Edit** As a user I can edit or delete my profile, my posts and my comments.
- **Notifications** As a user I can see if some one has comment my post.
- **See my posts** As a user I can see my posts.

### BackLog

Posts
- Got accés to the phone camera.
- Add posts to favorites.
- Add video.

User
- View favorites.
- Friends list
- Share posts with friends

## Client

### Routes & Pages

- '/' - Landing (public)
- '/login' - Log in (public)
- '/signup' - Sign up (public)
- '/posts' - Posts list page (public)
- '/posts/:searchValue' - Posts list page (public)
- '/posts/:id' - Post details (private)
- '/posts/:id/edit' - Post edit (private, user only)
- '/user/:id' - User view, user posts list (private)
- '/user' - Loged user view
- '/user/notifications'- User view, notifications about comments in user's posts (private, user only)
- '/user/edit' - User info edit (private, user only)

### Components

**General**
- Landing
- Log in
- Sing up
- Top navbar
- Bottom navbar

**Post**
- Post card
- Post create form
- Comment
- Comment create form

**User**
- User general layout
- User posts
- User notification

### Services
- Auth Service
	- auth.login(user)
	- auth.signup(user)
	- auth.logout()
	- auth.me()
- User Service
	- user.edit(id, data)
	- user.delete(id)
	- user.getUser(id)
- Post Service
	- post.list()
	- post.create(data)
	- post.edit(postId, data)
	- post.delete(postId)
	- post.detail(postId)
	- post.getComment(postId)
	- post.comment(data)
	- post.editComment(commentId, data)
	- post.deleteComment(commentId)

## Server

### Models

User model

   username: String // required & unique
   aboutMe: String
   email: String // required & unique
   password: String // required, unique & min: 6
   userImage: String // required
   favorites: [ObjectID < post >]
   createdAt: Date
   deletedAt: Date

Post model

   authorID: ObjectID < user > // required
   theme: String // required
   images: Array //required
   city: String // required
   country: String // required
   textContent: String
   makeThisHappend: String
   createdAt: Date
   deletedAt: Date
   notificaions: Number

Comments model

   postID: ObjectID < post > // required
   authorID: ObjectID < user > // required
   textContent: String // required
   createdAt: Date
   deletedAt: Date

### API Endpoints/Backend Routes

- GET/auth/me
- POST/auth/signup
	- Body:
		- username
		- about me
		- email
		- password
		- userImage
- POST/auth/login
	- body:
		- username/email
		- password
- POST/auth/logout

**User endpoints/Routes**

- PUT/user/:id
	- body
		- username
		- about me
		- email
		- password
		- userImage
- DELETE/user/:id

**Post Endpoint/Routes**

- GET/posts
- GET/posts/:id
- POST/posts/add
	- body
		- theme
		- images
		- city
		- country
		- makeThisHappen
		- textContent
- PUT/posts/:id/edit
	- body
		- theme
		- images
		- city
		- country
		- makeThisHappen
		- textContent
- DELETE/posts/:id/delete

**Comments Endpoint/Routes**

- GET/posts/:id/comments
- POST/comment/add
	- body
		- textContent
- PUT/comment/:id/edit
	- body
		- textContent
- DELETE/comment/:id/delete

## Links
**Trello**

**Git**
[Client repository Link](http://https://github.com/InesLuna/artivism-frontend "Client repository Link")
[Server repository Link](http://https://github.com/InesLuna/artivism-backend "Server repository Link")
