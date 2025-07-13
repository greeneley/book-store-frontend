# Cart Integration Documentation

## Overview
This document describes the integration of the shopping cart frontend with backend APIs for managing cart operations.

## Backend APIs

### 1. Fetch Cart
- **Endpoint**: `GET /api/v1/cart`
- **Description**: Retrieves the current user's cart with all items and product details
- **Response**: Array of cart items with nested product information

### 2. Add Item to Cart
- **Endpoint**: `POST /api/v1/cart-items/add`
- **Description**: Adds a product to the cart
- **Request Body**:
  ```json
  {
    "productId": "string",
    "quantity": "number"
  }
  ```

### 3. Update Cart Item
- **Endpoint**: `PUT /api/v1/cart-items/update`
- **Description**: Updates the quantity of a cart item
- **Request Body**:
  ```json
  {
    "productId": "string",
    "quantity": "number"
  }
  ```

### 4. Delete Cart Item
- **Endpoint**: `DELETE /api/v1/cart-items/{productId}`
- **Description**: Removes a product from the cart
- **Parameters**: `productId` in URL path

## Data Structures

### Backend Cart Item Response
```typescript
interface ProductCartResponse {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    salePrice: number;
    images: {
      id: string;
      url: string;
      alt: string;
    }[];
  };
}
```

### Frontend Cart Item Interface
```typescript
interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    salePrice: number;
    images: {
      id: string;
      url: string;
      alt: string;
    }[];
  };
}
```

## Implementation Details

### 1. CartService
- **File**: `src/services/CartService.ts`
- **Features**:
  - API calls for all cart operations
  - Data conversion between backend and frontend formats
  - Error handling with toast notifications
  - Static method `convertToCartItem()` for data transformation

### 2. Zustand Store
- **File**: `src/store/useCartStore.ts`
- **Features**:
  - State management for cart items, loading, and errors
  - Integration with CartService
  - Automatic data conversion on fetch
  - Toast notifications for user feedback

### 3. React Components
- **Cart Component**: `src/components/Cart/Cart.tsx`
  - Displays cart items with loading and error states
  - Handles quantity updates and item removal
  - Shows total price and checkout button

- **CartItem Component**: `src/components/Cart/CartItem.tsx`
  - Individual cart item display
  - Quantity controls with increment/decrement
  - Remove item functionality
  - Product image and details

- **ProductDetail Component**: `src/components/Product/ProductDetail.tsx`
  - Add to cart functionality
  - Quantity selection
  - Integration with cart store

### 4. Context Providers
- **AuthContextProvider**: `src/contexts/AuthContextProvider.tsx`
  - Manages user authentication state
  - Provides access token and user information
  - Handles token storage in localStorage
  - **Fixed**: Proper null handling and error boundaries

- **CartContextProvider**: `src/contexts/CartContextProvider.tsx`
  - Provides cart loading and error states
  - Automatic cart fetching on user login
  - Toast notifications for cart errors

- **AppContextProvider**: `src/contexts/AppContextProvider.tsx`
  - Manages cart badge count
  - Automatic count updates from cart state

### 5. Cart Synchronization
- **CartSync Component**: `src/components/CartSync.tsx`
  - Handles automatic cart synchronization
  - Fetches cart on user login
  - Clears cart on user logout
  - **Fixed**: Proper error handling and context initialization

### 6. Custom Hooks
- **useCartSync**: `src/hooks/useCartSync.ts`
  - Monitors auth state changes
  - Triggers cart operations based on login/logout
  - **Fixed**: Safe auth context access

## Usage Instructions

### 1. Adding Items to Cart
```typescript
import { useCartStore } from '@/store/useCartStore';

const { addToCart } = useCartStore();

// Add a product to cart
await addToCart(productId, quantity);
```

### 2. Updating Cart Items
```typescript
import { useCartStore } from '@/store/useCartStore';

const { updateCartItem } = useCartStore();

// Update item quantity
await updateCartItem(productId, newQuantity);
```

### 3. Removing Items from Cart
```typescript
import { useCartStore } from '@/store/useCartStore';

const { removeFromCart } = useCartStore();

// Remove item from cart
await removeFromCart(productId);
```

### 4. Accessing Cart State
```typescript
import { useCartStore } from '@/store/useCartStore';

const { cart, isLoading, error } = useCartStore();

// Access cart items
console.log(cart);

// Check loading state
if (isLoading) {
  console.log('Cart is loading...');
}

// Handle errors
if (error) {
  console.error('Cart error:', error);
}
```

## Error Handling

### 1. Network Errors
- Automatic retry for failed requests
- User-friendly error messages via toast notifications
- Graceful degradation when backend is unavailable

### 2. Authentication Errors
- Automatic token refresh handling
- Redirect to login page when authentication fails
- Clear cart state on logout

### 3. Data Validation
- Type checking for all API responses
- Fallback values for missing data
- Safe navigation for nested object properties

## Testing

### 1. Unit Tests
- **CartService**: API call testing with mocked responses
- **useCartStore**: State management and data conversion testing
- **Components**: User interaction and state updates testing

### 2. Integration Tests
- End-to-end cart workflow testing
- Authentication integration testing
- Error scenario testing

## Recent Fixes

### 1. Auth Context Null Handling
- **Issue**: `useAuth()` returning null during initialization
- **Solution**: Proper TypeScript typing and error boundaries
- **Files Updated**:
  - `src/contexts/AuthContextProvider.tsx`
  - `src/hooks/useCartSync.ts`
  - `src/contexts/CartContextProvider.tsx`
  - `src/contexts/AppContextProvider.tsx`
  - `src/routes/ProtectedRoute.tsx`
  - `src/hooks/internal/useUserInfo.tsx`
  - `src/pages/User/UserProfileLayout.tsx`
  - `src/components/layout/Header.tsx`
  - `src/pages/Authentication/Login.tsx`

### 2. Cart Synchronization
- **Issue**: Cart sync hook called before auth context initialization
- **Solution**: Moved cart sync to separate component with proper error handling
- **Files Updated**:
  - `src/components/CartSync.tsx` (new)
  - `src/index.tsx`
  - `src/contexts/AuthContextProvider.tsx`

## Dependencies

### Required Packages
- `zustand`: State management
- `axios`: HTTP client
- `react-hot-toast`: Toast notifications
- `react-router-dom`: Navigation

### Development Dependencies
- `@types/react`: TypeScript definitions
- `jest`: Testing framework
- `@testing-library/react`: Component testing

## Performance Considerations

### 1. State Management
- Efficient updates with Zustand
- Minimal re-renders with proper dependency arrays
- Optimistic updates for better UX

### 2. API Calls
- Debounced quantity updates
- Cached cart data
- Background synchronization

### 3. Error Recovery
- Automatic retry mechanisms
- Graceful error handling
- User-friendly error messages 