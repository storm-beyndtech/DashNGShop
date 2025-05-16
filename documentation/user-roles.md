# DASH NG User Roles Documentation

## Overview
DASH NG implements a comprehensive role-based access control system to manage permissions across different user types. This document outlines the various roles available in the system, their responsibilities, and capabilities.

## Role Hierarchy

1. **Owner** (Master Admin)
   - Has full system access
   - Can create and manage all other roles
   - Can view all sales data and analytics
   
2. **Super Admin**
   - Has access to most system features
   - Cannot modify owner settings
   - Can view all sales data 

3. **Manager**
   - More privileges than standard staff
   - Can manage inventory and products
   - Can access sales reports and customer data
   - Can process in-store orders

4. **Sales Personnel**
   - Primarily responsible for processing in-store sales
   - Can create walk-in customer orders
   - Has limited access to inventory management
   - Can view product details and stock levels

5. **Store Keeper**
   - Primarily responsible for inventory management
   - Can update stock levels
   - Can receive and log new inventory
   - Can view product details

6. **Staff**
   - Basic administrative privileges
   - Can view orders and products
   - Cannot modify system settings
   - Limited dashboard access

7. **Regular User** (Customer)
   - Can browse products
   - Can place online orders
   - Can manage their account
   - Can view order history

## Detailed Permissions by Role

### Owner (Master Admin)
- **User Management**
  - Create/manage all user accounts
  - Assign roles to users
  - Deactivate/reactivate accounts
  
- **Financial Access**
  - View all financial reports
  - Access all sales data (online and in-store)
  - View payment analytics
  
- **System Administration**
  - Configure system settings
  - Manage payment gateways
  - Define shipping options
  - View activity logs
  
- **Product Management**
  - Add/edit/delete all products
  - Manage categories and collections
  - Set pricing and discounts
  - Control inventory

### Super Admin
- All manager permissions plus:
- Create and manage sub-admins
- View system-wide analytics
- Access sales performance data across all personnel
- View activity logs for the entire system

### Manager
- All staff permissions plus:
- Create and manage basic product information
- Process refunds and exchanges
- View sales reports
- Manage customer accounts
- Process in-store orders
- View inventory reports

### Sales Personnel
- **Primary function**: Process in-store sales for walk-in customers
- Create in-store orders
- Access product catalog and pricing
- Check inventory availability
- Process various payment methods
- Limited customer data access
- View personal sales performance
  
### Store Keeper
- **Primary function**: Manage physical inventory
- Update product stock levels
- Receive new inventory shipments
- Manage product locations
- Flag low-stock items
- Create inventory reports
- View product details

### Staff
- Basic dashboard access
- View assigned tasks
- View product information
- Cannot modify system settings
- Access to basic customer support tools

### Regular User (Customer)
- Create and manage account
- Browse products
- Add items to cart
- Complete purchases
- Track orders
- View order history
- Save payment methods (securely)
- Add products to wishlist

## Access Control Implementation

Access control is implemented through middleware functions that verify user roles before allowing access to specific routes:

- `isAuthenticated`: Ensures the user is logged in
- `isAdmin`: Checks if the user has administrative privileges
- `isOwner`: Verifies the user is the store owner/master admin
- `isStorekeeperOrOwner`: Allows either the storekeeper or owner
- `isSuperAdmin`: Ensures super admin privileges
- `isSalesOrAdmin`: Checks if the user is sales personnel or higher

## Role Assignment Process

1. The Owner (Master Admin) creates store personnel accounts through the personnel management interface
2. During creation or editing, the Owner assigns specific roles to each account
3. The role determines what functions and interfaces are available to the user upon login
4. Roles can be changed at any time by the Owner through the personnel management interface

## Dashboard Views by Role

Each role has access to a customized dashboard view that shows only the relevant information and tools:

- **Owner/Super Admin**: Complete system overview, all analytics, staff management
- **Manager**: Sales reports, inventory status, customer issues, reduced system settings
- **Sales Personnel**: Sales interface, personal performance, daily targets
- **Store Keeper**: Inventory status, stock alerts, receiving interface
- **Staff**: Basic operational view, assigned tasks, customer information

## Notes on Security

- Role information is securely stored and verified server-side
- Attempting to access unauthorized routes will result in 403 Forbidden responses
- Role changes take effect immediately
- User sessions are secured and role information is re-validated on sensitive operations