import crypto from 'crypto';

/**
 * Generate Key
 * @return {string} - A random string
 */
export function generateKey() {
  return crypto.randomBytes(20).toString('hex');
}
