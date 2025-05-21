# PocketBase Setup Guide

## Introduction

This guide will help you set up PocketBase with the correct collections and permissions for the HTMX Talk Examples application.

## Initial Setup

1. Download PocketBase from [pocketbase.io](https://pocketbase.io/docs/)
2. Start the PocketBase server:
   ```
   ./pocketbase serve
   ```
3. Access the admin UI at http://localhost:8090/_/

## Admin Account

1. Create an admin account when prompted on first launch
2. Make note of your email and password

## Setting Up Collections

### Contacts Collection

1. Navigate to Collections in the admin UI
2. Click "Create collection"
3. Name: `contacts`
4. Type: `Base collection`
5. Click "Create"
6. Add the following fields:

| Field Name | Type    | Required | Options                      |
|------------|---------|----------|------------------------------|
| first      | Text    | Yes      |                              |
| last       | Text    | Yes      |                              |
| email      | Email   | Yes      |                              |
| phone      | Text    | No       |                              |

## Setting Up Public Permissions

By default, collections require authentication to access. For development purposes, you can set up public permissions:

1. Navigate to the `contacts` collection
2. Click on the "API Rules" tab
3. Create the following rules:

### Public Read Access

1. Click "Add rule"
2. Type: `List all records` (fetching a list of records)
3. Access Level: Public (no auth required)
4. Click "Save"

### Public Read Single Record

1. Click "Add rule"
2. Type: `View single record` (fetching an individual record)
3. Access Level: Public (no auth required)
4. Click "Save"

### Public Create Access

1. Click "Add rule"
2. Type: `Create record` (adding a new record)
3. Access Level: Public (no auth required)
4. Click "Save"

### Public Update Access

1. Click "Add rule"
2. Type: `Update record` (modifying existing record)
3. Access Level: Public (no auth required)
4. Click "Save"

### Public Delete Access

1. Click "Add rule"
2. Type: `Delete record` (removing a record)
3. Access Level: Public (no auth required)
4. Click "Save"

## Environment Variables

Make sure your `.env` file contains:

```
PUBLIC_POCKETBASE_URL=http://localhost:8090
```

## Alternative: Using Admin Authentication

If you prefer to use admin authentication instead of public permissions:

1. Update your `.env` file with admin credentials:
```
PUBLIC_POCKETBASE_URL=http://localhost:8090
PUBLIC_POCKETBASE_ADMIN_EMAIL=your-admin-email@example.com
PUBLIC_POCKETBASE_ADMIN_PASSWORD=your-admin-password
```

2. Make sure the authentication code in `src/lib/pocketbase.ts` is uncommented and using these environment variables

## Troubleshooting

If you encounter 403 errors, check:
1. Your collection permissions are set correctly
2. Admin authentication is working if you're using that approach
3. PocketBase server is running at the URL specified in your environment variables