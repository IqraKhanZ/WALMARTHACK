import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hyzttvamqpiilykxjjvl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5enR0dmFtcXBpaWx5a3hqanZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0ODIzNTksImV4cCI6MjA2NzA1ODM1OX0.tUI83upn7zzBJU7ys0FA7dHLMcBUrV9KfrO8nanHnlg'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)