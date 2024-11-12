import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { supabase } from '../database'

const testEmail = 'hunter1@test.com'
const testPword = 'hunter1'

describe('Supabase Auth Operations', () => {
  beforeEach(async () => {
    await supabase.auth.signOut()
  })

  afterEach(async () => {
    await supabase.auth.signOut()
  })

  it('should create a new user', async () => {
    const { data, error } = await supabase.auth.signUp({
      email: testEmail,
      password: testPword
    })

    expect(error).toBeNull()
    expect(data).toHaveProperty('user')
    expect(data.user?.email).toBe(testEmail)
  })

  it('should sign in an existing user', async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: testEmail,
      password: testPword
    })

    expect(error).toBeNull()
    expect(data).toHaveProperty('session')
    expect(data).toHaveProperty('user')
    expect(data.user?.email).toBe(testEmail)
  })

  it('should return an error for incorrect password', async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: testEmail,
      password: 'qweqweqwe',
    });

    expect(error).not.toBeNull();
    expect(error?.message).toContain('Invalid login credentials');
  });

  it('should sign out a user', async () => {
    await supabase.auth.signInWithPassword({
      email: testEmail,
      password: testPword,
    });

    const { error } = await supabase.auth.signOut();

    expect(error).toBeNull();

    const { data } = await supabase.auth.getSession();
    expect(data.session).toBeNull();
  });
})