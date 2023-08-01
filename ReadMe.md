# Product Management System 

***TechStack***

FrontEnd      | BackEnd      | ORM          | Database
------------- | -------------| -------------| -------------
React         | Nest Js        | Prisma      | PostgreSQL


## User Management Module

> Admin can add/edit/delete users
> Users can have roles (Admin or User)
> Roles can have permissions (e.g. manage products, manage categories, manage users)
> Users can also have individual permissions (e.g. view products, view orders)

## User Listing
> Admin can view a list of all users and their roles/permissions

# Authentication Module
> Users can log in using email/password or through Google Sign-In
> Users can reset their password through email if they forget it

## Product Management Module
> Admin can add/edit/delete products
> Users with appropriate permissions can add/edit/delete categories
> Admin can assign products to one or more categories
> Users with appropriate permissions can view products and categories

## Search & Cart Module
> Users can search for products by name, category, or price range
> Users can add products to their cart
> Users can view their cart and update the quantity of products in it
> Users can checkout and create orders

## Dynamic Role Management
> Admin can create new roles and assign permissions to them
> Admin can assign roles to users

## Order Module
> After login user can see his previous order

