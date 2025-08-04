import { createClientClient } from "@/lib/supabase/client"

export interface Document {
  id: string
  title: string
  description: string | null
  file_name: string
  file_url: string
  file_type: string
  file_size: number
  category: string
  tags: string[]
  uploaded_by: string
  created_at: string
  updated_at: string
}

export async function getAllDocuments(): Promise<Document[]> {
  const supabase = createClientClient()
  
  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching documents:', error)
    throw error
  }

  return data || []
}

export async function getDocumentsByCategory(category: string): Promise<Document[]> {
  const supabase = createClientClient()
  
  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching documents by category:', error)
    throw error
  }

  return data || []
}

export async function searchDocuments(query: string): Promise<Document[]> {
  const supabase = createClientClient()
  
  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error searching documents:', error)
    throw error
  }

  return data || []
}

export async function getDocumentById(id: string): Promise<Document | null> {
  const supabase = createClientClient()
  
  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching document by ID:', error)
    throw error
  }

  return data
}

export async function createDocument(documentData: Omit<Document, 'id' | 'created_at' | 'updated_at'>): Promise<Document> {
  const supabase = createClientClient()
  
  const { data, error } = await supabase
    .from('documents')
    .insert(documentData)
    .select()
    .single()

  if (error) {
    console.error('Error creating document:', error)
    throw error
  }

  return data
}

export async function updateDocument(id: string, updates: Partial<Document>): Promise<Document> {
  const supabase = createClientClient()
  
  const { data, error } = await supabase
    .from('documents')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating document:', error)
    throw error
  }

  return data
}

export async function deleteDocument(id: string): Promise<void> {
  const supabase = createClientClient()
  
  const { error } = await supabase
    .from('documents')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting document:', error)
    throw error
  }
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export function getFileIcon(fileType: string) {
  if (fileType.includes('pdf')) return '📄'
  if (fileType.includes('word') || fileType.includes('docx')) return '📝'
  if (fileType.includes('excel') || fileType.includes('xlsx')) return '📊'
  if (fileType.includes('powerpoint') || fileType.includes('pptx')) return '��'
  return '📁'
} 