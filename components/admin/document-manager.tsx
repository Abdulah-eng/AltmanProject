"use client"

import { useEffect, useState } from "react"
import { createClientClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Search, 
  Filter, 
  Mail, 
  Upload, 
  FileText, 
  File, 
  Download,
  Eye,
  Edit,
  Trash2,
  Send,
  Calendar,
  User
} from "lucide-react"

interface Document {
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

export function DocumentManager() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [emailDialogOpen, setEmailDialogOpen] = useState(false)
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false)
  const [emailData, setEmailData] = useState({
    to: "",
    subject: "",
    message: ""
  })
  const [uploadData, setUploadData] = useState({
    title: "",
    description: "",
    category: "",
    tags: ""
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const supabase = createClientClient()

  useEffect(() => {
    fetchDocuments()
  }, [])

  useEffect(() => {
    filterDocuments()
  }, [documents, searchTerm, categoryFilter])

  const fetchDocuments = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("documents")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error

      setDocuments(data || [])
    } catch (error) {
      console.error("Error fetching documents:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterDocuments = () => {
    let filtered = documents

    if (searchTerm) {
      filtered = filtered.filter(doc =>
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter(doc => doc.category === categoryFilter)
    }

    setFilteredDocuments(filtered)
  }

  const handleFileUpload = async () => {
    if (!selectedFile || !uploadData.title) return

    try {
      const fileExt = selectedFile.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `documents/${fileName}`

      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, selectedFile)

      if (uploadError) throw uploadError

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath)

      // Save document metadata to database
      const { error: insertError } = await supabase
        .from('documents')
        .insert({
          title: uploadData.title,
          description: uploadData.description,
          file_name: selectedFile.name,
          file_url: publicUrl,
          file_type: selectedFile.type,
          file_size: selectedFile.size,
          category: uploadData.category,
          tags: uploadData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
          uploaded_by: 'admin'
        })

      if (insertError) throw insertError

      setUploadDialogOpen(false)
      setUploadData({ title: "", description: "", category: "", tags: "" })
      setSelectedFile(null)
      fetchDocuments()
    } catch (error) {
      console.error("Error uploading document:", error)
    }
  }

  const handleEmailDocument = async () => {
    if (!selectedDocument || !emailData.to) return

    try {
      const response = await fetch('/api/send-document-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: emailData.to,
          subject: emailData.subject || `Document: ${selectedDocument.title}`,
          message: emailData.message,
          documentUrl: selectedDocument.file_url,
          documentName: selectedDocument.file_name
        }),
      })

      if (response.ok) {
        setEmailDialogOpen(false)
        setEmailData({ to: "", subject: "", message: "" })
        setSelectedDocument(null)
      } else {
        throw new Error('Failed to send email')
      }
    } catch (error) {
      console.error("Error sending email:", error)
    }
  }

  const deleteDocument = async (documentId: string) => {
    if (!confirm("Are you sure you want to delete this document?")) return

    try {
      const { error } = await supabase
        .from("documents")
        .delete()
        .eq("id", documentId)

      if (error) throw error

      fetchDocuments()
    } catch (error) {
      console.error("Error deleting document:", error)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) return <FileText className="w-4 h-4 text-red-500" />
    if (fileType.includes('word') || fileType.includes('docx')) return <FileText className="w-4 h-4 text-blue-500" />
    return <File className="w-4 h-4 text-gray-500" />
  }

  if (loading) {
    return <div className="flex items-center justify-center p-8">Loading documents...</div>
  }

  return (
    <div className="space-y-6">
      {/* Header with Upload Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Document Management</h2>
          <p className="text-gray-600">Upload, manage, and share documents with clients</p>
        </div>
        <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Upload className="w-4 h-4 mr-2" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Upload New Document</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={uploadData.title}
                  onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                  placeholder="Document title"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={uploadData.description}
                  onChange={(e) => setUploadData({ ...uploadData, description: e.target.value })}
                  placeholder="Document description"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Category</label>
                <Select value={uploadData.category} onValueChange={(value) => setUploadData({ ...uploadData, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="contracts">Contracts</SelectItem>
                    <SelectItem value="proposals">Proposals</SelectItem>
                    <SelectItem value="reports">Reports</SelectItem>
                    <SelectItem value="presentations">Presentations</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Tags (comma-separated)</label>
                <Input
                  value={uploadData.tags}
                  onChange={(e) => setUploadData({ ...uploadData, tags: e.target.value })}
                  placeholder="tag1, tag2, tag3"
                />
              </div>
              <div>
                <label className="text-sm font-medium">File</label>
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                />
              </div>
              <Button onClick={handleFileUpload} className="w-full" disabled={!selectedFile || !uploadData.title}>
                Upload Document
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="contracts">Contracts</SelectItem>
                <SelectItem value="proposals">Proposals</SelectItem>
                <SelectItem value="reports">Reports</SelectItem>
                <SelectItem value="presentations">Presentations</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Documents Table */}
      <Card>
        <CardHeader>
          <CardTitle>Documents ({filteredDocuments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Uploaded</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.map((document) => (
                  <TableRow key={document.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        {getFileIcon(document.file_type)}
                        <div>
                          <div className="font-medium">{document.title}</div>
                          <div className="text-sm text-gray-500">{document.file_name}</div>
                          {document.description && (
                            <div className="text-sm text-gray-400">{document.description}</div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{document.category}</Badge>
                    </TableCell>
                    <TableCell>{formatFileSize(document.file_size)}</TableCell>
                    <TableCell>{formatDate(document.created_at)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedDocument(document)
                            setPreviewDialogOpen(true)
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(document.file_url, '_blank')}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedDocument(document)
                            setEmailDialogOpen(true)
                          }}
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteDocument(document.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Email Dialog */}
      <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Document via Email</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">To Email</label>
              <Input
                type="email"
                value={emailData.to}
                onChange={(e) => setEmailData({ ...emailData, to: e.target.value })}
                placeholder="recipient@example.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Subject</label>
              <Input
                value={emailData.subject}
                onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
                placeholder="Document: [Document Title]"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Message</label>
              <Textarea
                value={emailData.message}
                onChange={(e) => setEmailData({ ...emailData, message: e.target.value })}
                placeholder="Please find the attached document..."
                rows={4}
              />
            </div>
            <Button onClick={handleEmailDocument} className="w-full">
              <Send className="w-4 h-4 mr-2" />
              Send Document
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedDocument?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded">
              <div className="flex items-center space-x-2 mb-2">
                {selectedDocument && getFileIcon(selectedDocument.file_type)}
                <span className="font-medium">{selectedDocument?.file_name}</span>
              </div>
              <div className="text-sm text-gray-600">
                Size: {selectedDocument && formatFileSize(selectedDocument.file_size)} | 
                Type: {selectedDocument?.file_type} | 
                Uploaded: {selectedDocument && formatDate(selectedDocument.created_at)}
              </div>
            </div>
            {selectedDocument?.file_type.includes('pdf') ? (
              <iframe
                src={selectedDocument.file_url}
                className="w-full h-96 border rounded"
                title={selectedDocument.title}
              />
            ) : (
              <div className="text-center py-8">
                <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">Preview not available for this file type</p>
                <Button
                  onClick={() => window.open(selectedDocument?.file_url, '_blank')}
                  className="mt-4"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download to View
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 