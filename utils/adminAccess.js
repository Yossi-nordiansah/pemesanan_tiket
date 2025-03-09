const ADMIN_USERNAMES = [
    'admin',
    // Add other admin usernames as needed
  ];
  
  /**
   * Check if a user has admin access
   * @param {Object} user - User object from authentication
   * @returns {boolean} - True if user has admin access
   */
  export function isAdmin(user) {
    if (!user) return false;
    return ADMIN_USERNAMES.includes(user.username);
  }