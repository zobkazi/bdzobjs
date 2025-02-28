// stores/auth.js
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isLoading: true,
    error: null,
    menuItems: [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        to: '/dashboard',
        protected: true
      },
      {
        label: 'Documents',
        icon: 'pi pi-folder',
        protected: true,
        items: [
          {
            label: 'All Documents',
            icon: 'pi pi-file',
            to: '/documents',
            protected: true
          },
          {
            label: 'New Document',
            icon: 'pi pi-plus',
            to: '/documents/new',
            protected: true
          }
        ]
      },
      {
        separator: true
      },
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        protected: true,
        items: [
          {
            label: 'Account',
            icon: 'pi pi-user',
            to: '/settings/account',
            protected: true
          }
        ]
      },
      {
        label: 'Help',
        icon: 'pi pi-question-circle',
        items: [
          {
            label: 'Documentation',
            icon: 'pi pi-book',
            url: 'https://docs.example.com',
            target: '_blank',
            protected: false
          }
        ]
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: 'logout',
        protected: true
      }
    ]
  }),
  
  actions: {
    // Fetch authenticated user
    async fetchUser() {
      this.isLoading = true;
      this.error = null;
      
      try {
        const token = this.getToken();
        if (!token) {
          throw new Error('No authentication token found');
        }
        
        const response = await fetch('/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Authentication failed');
        }
        
        const data = await response.json();
        this.user = data.user;
      } catch (error) {
        console.error('Auth error:', error);
        this.error = error.message;
        this.user = null;
        this.clearToken();
      } finally {
        this.isLoading = false;
      }
    },
    
    // Logout the user
    async logout() {
      try {
        // Optional: Call logout API if needed
        // await fetch('/api/auth/logout', { method: 'POST' });
        
        this.clearToken();
        this.user = null;
        
        // Navigate to login (handled by component)
        return true;
      } catch (error) {
        console.error('Logout error:', error);
        return false;
      }
    },
    
    // Token management
    getToken() {
      return localStorage.getItem('auth_token') || '';
    },
    
    clearToken() {
      localStorage.removeItem('auth_token');
    },
    
    // Filter menu items based on auth status
    getFilteredMenuItems() {
      const clone = JSON.parse(JSON.stringify(this.menuItems));
      return this.filterProtectedItems(clone);
    },
    
    // Recursively filter protected items
    filterProtectedItems(items) {
      return items.filter(item => {
        // Keep separators
        if (item.separator) return true;
        
        // Filter protected items
        if (item.protected && !this.user) return false;
        
        // Handle command items
        if (item.command === 'logout') {
          // Replace string command with actual function
          item.command = () => this.logout();
        }
        
        // Recursively filter subitems
        if (item.items && item.items.length) {
          item.items = this.filterProtectedItems(item.items);
          if (item.items.length === 0) return false;
        }
        
        return true;
      });
    }
  }
});