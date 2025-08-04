"use client"

import { useEffect, useState } from "react"
import { getTeamMembers, testDatabaseConnection, type TeamMember } from "@/lib/team-utils"
import Image from "next/image"

export default function TestTeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [connectionTest, setConnectionTest] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    testTeamMembers()
  }, [])

  const testTeamMembers = async () => {
    try {
      console.log("Testing team members functionality...")
      
      // Test database connection first
      const connectionResult = await testDatabaseConnection()
      setConnectionTest(connectionResult)
      console.log("Connection test result:", connectionResult)

      // Fetch team members
      const members = await getTeamMembers()
      setTeamMembers(members)
      console.log("Team members fetched:", members)
    } catch (error) {
      console.error('Error testing team members:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Testing team members...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Team Members Test Page</h1>
        
        <div className="grid gap-8">
          {/* Database Connection Test */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Database Connection Test</h2>
            {connectionTest ? (
              <div className={`p-4 rounded ${connectionTest.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                <p><strong>Status:</strong> {connectionTest.success ? 'Success' : 'Failed'}</p>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="border rounded p-4">
                    <h3 className="font-medium mb-2">{member.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{member.title}</p>
                    {member.image_url ? (
                      <div className="relative h-32 w-full mb-2">
                        <Image
                          src={member.image_url}
                          alt={member.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    ) : (
                      <p className="text-red-500 text-sm mb-2">No image</p>
                    )}
                    <div className="text-xs text-gray-500 space-y-1">
                      <p>ID: {member.id}</p>
                      <p>Featured: {member.featured ? 'Yes' : 'No'}</p>
                      <p>Order: {member.order_index}</p>
                      <p>Email: {member.email || 'N/A'}</p>
                      <p>Phone: {member.phone || 'N/A'}</p>
                      {member.bio && <p>Bio: {member.bio.substring(0, 100)}...</p>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-red-500 text-lg">No team members found</p>
                <p className="text-gray-500 mt-2">Check your database connection and team_members table</p>
              </div>
            )}
          </div>

          {/* Environment Variables */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Environment Variables</h2>
            <div className="space-y-2">
              <p><strong>NEXT_PUBLIC_SUPABASE_URL:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Not set'}</p>
              <p><strong>NEXT_PUBLIC_SUPABASE_ANON_KEY:</strong> {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Not set'}</p>
            </div>
            {!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? (
              <div className="mt-4 p-4 bg-yellow-100 text-yellow-800 rounded">
                <p><strong>Warning:</strong> Supabase environment variables are not set!</p>
                <p className="mt-2">Create a <code>.env.local</code> file with:</p>
                <pre className="mt-2 text-xs bg-gray-100 p-2 rounded">
{`NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key`}
                </pre>
              </div>
            ) : (
              <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
                <p><strong>Success:</strong> Environment variables are configured!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 