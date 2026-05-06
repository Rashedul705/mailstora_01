'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { blogApi } from '@/lib/blogApi';
import { Save, Eye, CheckCircle2, AlertCircle, UploadCloud, X, ArrowLeft, Image as ImageIcon, Link as LinkIcon, Code, Minus, Undo2, Redo2, Clock } from 'lucide-react';
import NextLink from 'next/link';

export default function BlogEditor({ postId }: { postId?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [token, setToken] = useState('');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [category, setCategory] = useState('Email Marketing');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [author, setAuthor] = useState('Rashedul Islam');
  const [status, setStatus] = useState<'draft' | 'published' | 'scheduled'>('draft');
  const [scheduledAt, setScheduledAt] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  // SEO Score
  const [seoScore, setSeoScore] = useState(0);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: 'Start writing your post...' })
    ],
    content: '',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto focus:outline-none min-h-[400px] text-[15px] text-gray-700 leading-relaxed',
      },
    },
    onUpdate: () => {
      // Trigger autosave/score update if needed
    }
  });

  useEffect(() => {
    const t = localStorage.getItem('adminAuth');
    if (t) setToken(t);
  }, []);

  useEffect(() => {
    if (postId && token) {
      setLoading(true);
      blogApi.getAdminPostById(token, postId)
        .then(data => {
          setTitle(data.title);
          setSlug(data.slug);
          setExcerpt(data.excerpt);
          if (editor) editor.commands.setContent(data.content || '');
          setCoverImage(data.coverImage);
          setCategory(data.category);
          setTags(data.tags);
          setAuthor(data.author);
          setStatus(data.status);
          if (data.scheduledAt) setScheduledAt(new Date(data.scheduledAt).toISOString().slice(0, 16));
          setMetaTitle(data.metaTitle);
          setMetaDescription(data.metaDescription);
        })
        .finally(() => setLoading(false));
    }
  }, [postId, token, editor]);

  const calculateSeoScore = useCallback(() => {
    let score = 0;
    if (metaTitle.length >= 50 && metaTitle.length <= 60) score += 25;
    if (metaDescription.length >= 140 && metaDescription.length <= 160) score += 25;
    if (coverImage) score += 20;
    
    if (slug && metaTitle) {
      const words = metaTitle.toLowerCase().split(' ');
      if (words.some(w => w.length > 3 && slug.includes(w))) score += 15;
    }
    
    const wordCount = editor?.getText().split(' ').length || 0;
    if (wordCount > 300) score += 15;

    setSeoScore(score);
  }, [metaTitle, metaDescription, coverImage, slug, editor]);

  useEffect(() => {
    calculateSeoScore();
  }, [calculateSeoScore]);

  const handleTitleBlur = () => {
    if (!slug && title) {
      const generated = title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
      setSlug(generated);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (t: string) => {
    setTags(tags.filter(tag => tag !== t));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;
    try {
      const res = await blogApi.uploadImage(token, file);
      setCoverImage(res.url);
    } catch (err) {
      alert('Failed to upload image');
    }
  };

  const addImageToEditor = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e: any) => {
      const file = e.target.files?.[0];
      if (!file || !token) return;
      try {
        const res = await blogApi.uploadImage(token, file);
        if (editor) {
          editor.chain().focus().setImage({ src: res.url }).run();
        }
      } catch (err) {
        alert('Failed to upload image for editor');
      }
    };
    input.click();
  };

  const savePost = async (newStatus?: 'draft' | 'published' | 'scheduled') => {
    if (!token) return;
    setSaving(true);
    const postData = {
      title,
      slug,
      excerpt,
      content: editor?.getHTML() || '',
      coverImage,
      category,
      tags,
      author,
      status: newStatus || status,
      scheduledAt: scheduledAt ? new Date(scheduledAt) : undefined,
      metaTitle,
      metaDescription,
      readingTime: Math.ceil((editor?.getText().split(' ').length || 0) / 200) || 1
    };

    try {
      if (postId) {
        await blogApi.updatePost(token, postId, postData);
      } else {
        const res = await blogApi.createPost(token, postData);
        router.replace(`/admin/blog/${res._id}/edit`);
      }
      setLastSaved(new Date());
      if (newStatus) setStatus(newStatus);
    } catch (err) {
      alert('Failed to save post');
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (title && token) savePost();
    }, 30000);
    return () => clearInterval(timer);
  }, [title, slug, excerpt, coverImage, category, tags, author, status, scheduledAt, metaTitle, metaDescription, editor, token, postId]);


  if (loading) return <div className="p-8">Loading editor...</div>;

  return (
    <div className="flex flex-col h-full bg-white font-sans text-gray-800">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200 shrink-0">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-[#2d287b]">{postId ? 'Edit Post' : 'New Post'}</h1>
          <span className={`px-2.5 py-0.5 text-xs rounded-full font-medium ${status === 'published' ? 'bg-green-100 text-green-800' : status === 'scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
          {lastSaved && <span className="text-xs text-gray-400 ml-2">Saved {lastSaved.toLocaleTimeString()}</span>}
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold border border-gray-200 rounded hover:bg-gray-50 transition-colors" onClick={() => window.open(`/blog/${slug}`, '_blank')}>
            <Eye size={14} /> Preview
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#2d287b] bg-indigo-50 rounded hover:bg-indigo-100 transition-colors" onClick={() => savePost('draft')} disabled={saving}>
            Save Draft
          </button>
          <button className="px-5 py-2 text-xs font-bold text-white bg-[#f97316] rounded hover:bg-[#ea580c] transition-colors shadow-sm" onClick={() => savePost('published')} disabled={saving}>
            Publish →
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden h-[calc(100vh-73px)]">
        {/* Main Editor Area */}
        <div className="flex-1 overflow-y-auto bg-white p-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Toolbar */}
            {editor && (
              <div className="flex flex-wrap items-center gap-1 p-1 bg-white border border-gray-200 rounded-lg mb-6 sticky top-0 z-10 shadow-sm">
                <select className="text-xs font-medium bg-transparent border-r border-gray-200 py-1.5 px-2 outline-none text-gray-600 mr-1" onChange={(e) => {
                  if(e.target.value === 'p') editor.chain().focus().setParagraph().run();
                  if(e.target.value === 'h1') editor.chain().focus().toggleHeading({ level: 1 }).run();
                  if(e.target.value === 'h2') editor.chain().focus().toggleHeading({ level: 2 }).run();
                  if(e.target.value === 'h3') editor.chain().focus().toggleHeading({ level: 3 }).run();
                }}>
                  <option value="p">Paragraph</option>
                  <option value="h1">Heading 1</option>
                  <option value="h2">Heading 2</option>
                  <option value="h3">Heading 3</option>
                </select>

                <button onClick={() => editor.chain().focus().toggleBold().run()} className={`p-1.5 rounded text-gray-600 ${editor.isActive('bold') ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100'}`} title="Bold"><b>B</b></button>
                <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-1.5 rounded text-gray-600 ${editor.isActive('italic') ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100'}`} title="Italic"><i>I</i></button>
                <button onClick={() => editor.chain().focus().toggleStrike().run()} className={`p-1.5 rounded text-gray-600 ${editor.isActive('strike') ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100'}`} title="Strikethrough"><s>S</s></button>
                
                <div className="w-px h-5 bg-gray-200 mx-1 self-center"></div>
                
                <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`p-1.5 rounded text-xs font-bold text-gray-600 ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100'}`}>H1</button>
                <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`p-1.5 rounded text-xs font-bold text-gray-600 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100'}`}>H2</button>
                <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={`p-1.5 rounded text-xs font-bold text-gray-600 ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100'}`}>H3</button>
                
                <div className="w-px h-5 bg-gray-200 mx-1 self-center"></div>

                <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={`px-2 py-1.5 rounded text-xs font-medium text-gray-600 flex items-center gap-1 ${editor.isActive('bulletList') ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100'}`}>• List</button>
                <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`px-2 py-1.5 rounded text-xs font-medium text-gray-600 flex items-center gap-1 ${editor.isActive('orderedList') ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100'}`}>1. List</button>
                <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`px-2 py-1.5 rounded text-xs font-medium text-gray-600 flex items-center gap-1 ${editor.isActive('blockquote') ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100'}`}>" Quote</button>
                
                <div className="w-px h-5 bg-gray-200 mx-1 self-center"></div>

                <button onClick={() => {
                  const url = window.prompt('URL');
                  if (url) editor.chain().focus().setLink({ href: url }).run();
                }} className={`px-2 py-1.5 rounded text-xs font-medium text-gray-600 flex items-center gap-1 ${editor.isActive('link') ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100'}`}><LinkIcon size={12}/> Link</button>
                <button onClick={addImageToEditor} className="px-2 py-1.5 rounded text-xs font-medium text-gray-600 flex items-center gap-1 hover:bg-gray-100"><ImageIcon size={12}/> Image</button>
                <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={`px-2 py-1.5 rounded text-xs font-medium text-gray-600 flex items-center gap-1 ${editor.isActive('codeBlock') ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100'}`}><Code size={12}/> Code</button>
                <button onClick={() => editor.chain().focus().setHorizontalRule().run()} className={`px-2 py-1.5 rounded text-xs font-medium text-gray-600 flex items-center gap-1 hover:bg-gray-100`}><Minus size={12}/> Divider</button>

                <div className="w-px h-5 bg-gray-200 mx-1 self-center ml-auto"></div>
                <button onClick={() => editor.chain().focus().undo().run()} className="p-1.5 rounded text-gray-500 hover:text-gray-800 hover:bg-gray-100"><Undo2 size={14}/></button>
                <button onClick={() => editor.chain().focus().redo().run()} className="p-1.5 rounded text-gray-500 hover:text-gray-800 hover:bg-gray-100"><Redo2 size={14}/></button>
              </div>
            )}

            <div className="bg-[#f8fafc] text-xs text-gray-400 p-2.5 rounded flex items-center gap-2 mb-6 border border-gray-100 font-mono">
              mailstora.com/blog/<span className="text-gray-600 font-bold">{slug || 'your-slug-here'}</span>
              <button className="text-blue-500 hover:underline ml-2 flex items-center gap-1" onClick={() => {
                const newSlug = prompt("Edit slug:", slug);
                if (newSlug) setSlug(newSlug);
              }}>✎ Edit slug</button>
            </div>
            
            <textarea 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleTitleBlur}
              placeholder="Post Title"
              className="w-full text-[32px] md:text-[40px] font-bold text-[#2d287b] placeholder-gray-300 border-none outline-none resize-none bg-transparent leading-tight mb-4"
              rows={2}
            />
            
            <textarea 
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Most businesses make the same email mistakes over and over. Here's how to fix them before your next campaign goes out."
              className="w-full text-base text-gray-500 placeholder-gray-300 border-none outline-none resize-none bg-transparent mb-6"
              rows={2}
            />
            
            <EditorContent editor={editor} className="min-h-[500px] mt-4" />
          </div>
        </div>

        {/* Right Settings Panel */}
        <div className="w-[300px] p-6 overflow-y-auto bg-white border-l border-gray-200 shrink-0">
          
          <div className="mb-8">
            <h3 className="text-xs font-bold text-[#2d287b] uppercase tracking-wider mb-4 border-b pb-2">Publish Settings</h3>
            
            <label className="block text-[11px] font-bold text-gray-500 mb-1.5 uppercase">Status</label>
            <select value={status} onChange={e => setStatus(e.target.value as any)} className="w-full p-2 border border-gray-200 rounded mb-4 text-xs bg-gray-50 focus:bg-white outline-none">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="scheduled">Scheduled</option>
            </select>
            
            {status === 'scheduled' && (
              <>
                <label className="block text-[11px] font-bold text-gray-500 mb-1.5 uppercase">Publish Date</label>
                <input type="datetime-local" value={scheduledAt} onChange={e => setScheduledAt(e.target.value)} className="w-full p-2 border border-gray-200 rounded mb-4 text-xs bg-gray-50 focus:bg-white outline-none" />
              </>
            )}

            <label className="block text-[11px] font-bold text-gray-500 mb-1.5 uppercase">Author</label>
            <input type="text" value={author} onChange={e => setAuthor(e.target.value)} className="w-full p-2 border border-gray-200 rounded text-xs bg-gray-50 focus:bg-white outline-none" />
          </div>

          <div className="mb-8">
            <h3 className="text-xs font-bold text-[#2d287b] uppercase tracking-wider mb-4 border-b pb-2">SEO Optimization</h3>
            
            <div className={`flex items-center gap-1.5 px-3 py-2 rounded text-xs font-bold mb-4 ${seoScore >= 80 ? 'bg-green-50 text-green-700 border border-green-100' : seoScore >= 50 ? 'bg-yellow-50 text-yellow-700 border border-yellow-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
              <div className={`w-2 h-2 rounded-full ${seoScore >= 80 ? 'bg-green-500' : seoScore >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
              SEO Score: {seoScore >= 80 ? 'Good' : seoScore >= 50 ? 'Okay' : 'Needs Work'} ({seoScore}/100)
            </div>

            <label className="block text-[11px] font-bold text-gray-500 mb-1.5 uppercase">Meta Title <span className="font-normal text-gray-400 normal-case">({metaTitle.length} chars)</span></label>
            <input type="text" value={metaTitle} onChange={e => setMetaTitle(e.target.value)} className="w-full p-2 border border-gray-200 rounded mb-4 text-xs bg-gray-50 focus:bg-white outline-none" placeholder="50-60 chars" />
            
            <label className="block text-[11px] font-bold text-gray-500 mb-1.5 uppercase">Meta Description <span className="font-normal text-gray-400 normal-case">({metaDescription.length} chars)</span></label>
            <textarea value={metaDescription} onChange={e => setMetaDescription(e.target.value)} className="w-full p-2 border border-gray-200 rounded mb-4 text-xs bg-gray-50 focus:bg-white outline-none resize-none" placeholder="140-160 chars" rows={3} />

            <label className="block text-[11px] font-bold text-gray-500 mb-1.5 uppercase">URL Slug</label>
            <input type="text" value={slug} onChange={e => setSlug(e.target.value)} className="w-full p-2 border border-gray-200 rounded text-xs bg-gray-50 focus:bg-white outline-none" placeholder="email-marketing-mistakes" />
          </div>

          <div className="mb-8">
            <h3 className="text-xs font-bold text-[#2d287b] uppercase tracking-wider mb-4 border-b pb-2">Category & Tags</h3>
            
            <label className="block text-[11px] font-bold text-gray-500 mb-1.5 uppercase">Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)} className="w-full p-2 border border-gray-200 rounded mb-4 text-xs bg-gray-50 focus:bg-white outline-none">
              <option value="Email Marketing">Email Marketing</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Business Growth">Business Growth</option>
              <option value="Tutorials">Tutorials</option>
              <option value="Case Studies">Case Studies</option>
            </select>

            <label className="block text-[11px] font-bold text-gray-500 mb-1.5 uppercase">Tags</label>
            <input type="text" value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={handleAddTag} placeholder="Type and press Enter..." className="w-full p-2 border border-gray-200 rounded mb-3 text-xs bg-gray-50 focus:bg-white outline-none" />
            <div className="flex flex-wrap gap-1.5">
              {tags.map(tag => (
                <span key={tag} className="flex items-center gap-1 px-2 py-1 text-[10px] font-bold text-indigo-700 bg-indigo-50 rounded">
                  {tag} <X size={10} className="cursor-pointer hover:text-red-500" onClick={() => handleRemoveTag(tag)} />
                </span>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xs font-bold text-[#2d287b] uppercase tracking-wider mb-4 border-b pb-2">Cover Image</h3>
            {coverImage ? (
              <div className="relative group rounded-lg overflow-hidden border border-gray-200">
                <img src={coverImage} alt="Cover" className="w-full h-auto" />
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => setCoverImage('')} className="text-white text-xs font-bold bg-red-500 px-3 py-1.5 rounded">Remove</button>
                </div>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-32 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <ImageIcon size={24} className="text-gray-400 mb-2" />
                <span className="text-xs font-bold text-[#2d287b]">Click to upload</span>
                <span className="text-[10px] text-gray-400 mt-1">JPG, PNG, WebP • Max 2MB</span>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </label>
            )}
          </div>

          <div className="mb-8">
            <h3 className="text-xs font-bold text-[#2d287b] uppercase tracking-wider mb-4 border-b pb-2">Reading Time</h3>
            <div className="bg-gray-50 text-gray-500 text-xs p-3 rounded border border-gray-200 flex items-center gap-2">
              <Clock size={14} />
              ~{Math.ceil((editor?.getText().split(' ').length || 0) / 200) || 1} min read (auto-calculated)
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
