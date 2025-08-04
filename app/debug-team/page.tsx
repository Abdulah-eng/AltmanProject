"use client"

import { useEffect, useState } from "react"
import { getTeamMembers, testDatabaseConnection, type TeamMember } from "@/lib/team-utils"

export default function DebugTeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [connectionTest, setConnectionTest] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [envStatus, setEnvStatus] = useState({
    supabaseUrl: false,
    supabaseKey: false
  })

  useEffect(() => {
    debugTeamMembers()
  }, [])

  const debugTeamMembers = async () => {
    try {
      console.log("=== TEAM MEMBERS DEBUG ===")
      
      // Check environment variables
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      
      setEnvStatus({
        supabaseUrl: !!supabaseUrl,
        supabaseKey: !!supabaseKey
      })
      
      console.log("Environment Variables:")
      console.log("- NEXT_PUBLIC_SUPABASE_URL:", supabaseUrl ? "SET" : "NOT SET")
      console.log("- NEXT_PUBLIC_SUPABASE_ANON_KEY:", supabaseKey ? "SET" : "NOT SET")
      
      // Test database connection
      const connectionResult = await testDatabaseConnection()
      setConnectionTest(connectionResult)
      console.log("Connection test result:", connectionResult)

      // Fetch team members
      const members = await getTeamMembers()
      setTeamMembers(members)
      console.log("Team members fetched:", members)
      console.log("Number of team members:", members?.length || 0)
      
    } catch (error) {
      console.error('Error debugging team members:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Debugging team members...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Team Members Debug</h1>
        
        <div className="grid gap-6">
          {/* Environment Variables */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Environment Variables</h2>
            <div className="space-y-2">
              <div className={`p-3 rounded ${envStatus.supabaseUrl ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                <strong>NEXT_PUBLIC_SUPABASE_URL:</strong> {envStatus.supabaseUrl ? '✅ Set' : '❌ Not Set'}
              </div>
              <div className={`p-3 rounded ${envStatus.supabaseKey ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                <strong>NEXT_PUBLIC_SUPABASE_ANON_KEY:</strong> {envStatus.supabaseKey ? '✅ Set' : '❌ Not Set'}
              </div>
            </div>
            
            {(!envStatus.supabaseUrl || !envStatus.supabaseKey) && (
              <div className="mt-4 p-4 bg-yellow-100 text-yellow-800 rounded">
                <p><strong>⚠️ Issue Found:</strong> Supabase environment variables are not configured!</p>
                <p className="mt-2">To fix this:</p>
                <ol className="mt-2 list-decimal list-inside space-y-1">
                  <li>Create a <code>.env.local</code> file in your project root</li>
                  <li>Add your Supabase credentials:</li>
                </ol>
                <pre className="mt-2 text-xs bg-gray-100 p-2 rounded">
{`NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here`}
                </pre>
                <p className="mt-2">3. Restart your development server: <code>npm run dev</code></p>
              </div>
            )}
          </div>

          {/* Database Connection Test */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Database Connection Test</h2>
            {connectionTest ? (
              <div className={`p-4 rounded ${connectionTest.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                <p><strong>Status:</strong> {connectionTest.success ? '✅ Success' : '❌ Failed'}</p>
                <p><strong>Message:</strong> {connectionTest.message}</p>
                {connectionTest.data && (
                  <details className="mt-2">
                    <summary className="cursor-pointer">View Details</summary>
                    <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
                      {JSON.stringify(connectionTest.data, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            ) : (
              <p className="text-red-500">No connection test result</p>
            )}
          </div>

          {/* Team Members */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Team Members ({teamMembers.length})</h2>
            {teamMembers.length > 0 ? (
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="border rounded p-4">
                    <h3 className="font-medium">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.title}</p>
                    <div className="text-xs text-gray-500 mt-2">
                      <p>ID: {member.id}</p>
                      <p>Featured: {member.featured ? 'Yes' : 'No'}</p>
                      <p>Order: {member.order_index}</p>
                      <p>Email: {member.email || 'N/A'}</p>
                      <p>Image URL: {member.image_url ? 'Set' : 'Not set'}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-red-500 text-lg">No team members found</p>
                <p className="text-gray-500 mt-2">
                  {!envStatus.supabaseUrl || !envStatus.supabaseKey 
                    ? 'This is likely due to missing environment variables.' 
                    : 'Check your database connection and team_members table.'}
                </p>
              </div>
            )}
          </div>

          {/* Next Steps */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Next Steps</h2>
            <div className="space-y-2">
              <p>1. <strong>Check Environment Variables:</strong> Make sure both Supabase URL and key are set</p>
              <p>2. <strong>Restart Server:</strong> After setting environment variables, restart your dev server</p>
              <p>3. <strong>Check Database:</strong> Verify your team_members table has data</p>
              <p>4. <strong>Test Pages:</strong> Visit <code>/test-team</code> for a detailed test</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 