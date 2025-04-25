import {createClient} from '@supabase/supabase-js'

const URL = 'https://fexupfvmcpejodsdkdqg.supabase.co'
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZleHVwZnZtY3Blam9kc2RrZHFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0NTMxODYsImV4cCI6MjA2MTAyOTE4Nn0.ltabSxzzHIl7FZ-Fi-4dkoeocgI-TLiln5fVM2s1_jg'

export const supabase = createClient(URL, API_KEY);