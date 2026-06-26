# Drinkoo Website Implementation Plan

## Overview
This plan outlines an end-to-end Drinkoo website implementation for a fictional Indian beverage company. The site will include a polished landing experience, SKU detail pages, an admin dashboard with restricted access, a cart experience, and an error page. The implementation will be based on the existing repository dummy data and will follow the requested guardrails.

## Objectives
- Create a sleek, professional website for Drinkoo with a blue-and-white visual language.
- Present beverages as premium products with Indian market context.
- Provide SKU pages with product information, nutrition details, and purchase actions.
- Provide an admin-only dashboard for sales, distributor, and shipment tracking insights.
- Keep the implementation robust, non-destructive, and easy to review.

## Website Structure
1. Home page
   - Hero section inspired by the provided layout.
   - Beverage catalog grid with navigation controls.
   - About section with brand storytelling.
   - Contact section.
   - Footer with section links and secondary pages.

2. SKU detail pages
   - One page per beverage.
   - Product copy written in a professional, non-salesy tone.
   - Nutrition information and size details from the dummy data.
   - Action buttons for Add to Cart and Buy Now.

3. Cart page
   - Displays selected beverages.
   - Supports cart state in the browser.
   - Buy Now redirects to an error page for now.

4. Login page
   - Minimal admin login form.
   - Default credentials: username admin, password password.
   - Signup flow should be intentionally blocked and show an error.

5. Dashboard page
   - Accessible only after login.
   - Sales trends by state, beverage, and day.
   - Filters for state and beverage.
   - Distributor inventory summary.
   - Package tracking table with dummy tracking IDs.

6. Error page
   - Friendly fallback when users navigate to unavailable routes.

## Frontend Plan
- Use a modern frontend stack suitable for quick implementation and clean UI.
- Use component-based structure for reusable sections.
- Build a polished landing page with clear sections and whitespace.
- Use responsive layout for desktop and mobile.
- Use the existing Drinkoo dummy data for product content and nutrition metadata.
- Keep interactions minimal except on the dashboard.

## Backend Plan
- Provide a lightweight backend for serving the website data and admin authentication.
- Pre-fetch data needed for dashboard views and product pages.
- Serve the website content using local static or server-rendered routes.
- Keep the implementation simple, reliable, and suitable for local development.

## Authentication Flow
- Only allow admin access through a simple login form.
- Default credentials:
  - username: admin
  - password: password
- Signup should not be allowed and should show an error message.
- Cart actions should not require authentication.
- Refreshing the cart should not preserve state unless implemented in browser storage.

## API Flow
- Backend-to-frontend data flow will be simple and local.
- Product and dashboard data will be served from the backend or embedded data source.
- No complex external API integration is required at this stage.

## Data Sources
- Use the dummy data already defined in the repository for:
  - beverage SKUs
  - nutrition information
  - sales by state
  - distributor information
  - tracking information

## Guardrails
- Do not delete any existing pages or data.
- Do not remove existing repository data.
- Keep all changes additive and reviewable.
- Preserve the repository instructions and avoid accessing confidential content.

## Implementation Notes
- The website should feel premium and credible, not overly salesy.
- Use professional copy and thoughtful UI styling.
- Use compressed remote images if needed, but keep loading performance in mind.
- Keep the site easy to run locally and accessible through a single URL.
