import React, { useRef } from 'react';
import { 
  Building2, 
  FileText, 
  Link2, 
  Upload, 
  X,
  AlertCircle,
  Type
} from 'lucide-react';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { GeneratorState } from '../../types/generator';

interface ContentConfigurationProps {
  state: GeneratorState;
  updateState: (updates: Partial<GeneratorState>) => void;
}

const ACCEPTED_FILE_TYPES = '.txt,.pdf,.doc,.docx';
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export function ContentConfiguration({ state, updateState }: ContentConfigurationProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBusinessInfoChange = (
    field: keyof typeof state.businessInfo,
    value: string
  ) => {
    updateState({
      businessInfo: { ...state.businessInfo, [field]: value }
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => file.size <= MAX_FILE_SIZE);
    
    if (validFiles.length !== files.length) {
      alert('Some files were too large and were not included. Maximum size is 10MB.');
    }

    updateState({ uploadedFiles: [...state.uploadedFiles, ...validFiles] });
  };

  const handleRemoveFile = (index: number) => {
    updateState({
      uploadedFiles: state.uploadedFiles.filter((_, i) => i !== index)
    });
  };

  const handleAddLink = () => {
    updateState({
      externalLinks: [...state.externalLinks, '']
    });
  };

  const handleLinkChange = (index: number, value: string) => {
    const newLinks = [...state.externalLinks];
    newLinks[index] = value;
    updateState({ externalLinks: newLinks });
  };

  const handleRemoveLink = (index: number) => {
    updateState({
      externalLinks: state.externalLinks.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-medium mb-2">Content Configuration</h2>
        <p className="text-gray-600">
          Configure the details for your content generation.
        </p>
      </div>

      {/* Required Fields */}
      <div className="space-y-4">
        <h3 className="font-medium">Required Information</h3>
        
        <div className="space-y-4">
          <div className="relative">
            <Type className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              value={state.mainKeyword}
              onChange={(e) => updateState({ mainKeyword: e.target.value })}
              placeholder="Main Keyword or Title"
              className="pl-10"
              required
            />
          </div>

          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              value={state.businessInfo.name}
              onChange={(e) => handleBusinessInfoChange('name', e.target.value)}
              placeholder="Business Name"
              className="pl-10"
              required
            />
          </div>

          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              value={state.businessInfo.type}
              onChange={(e) => handleBusinessInfoChange('type', e.target.value)}
              placeholder="Business Type"
              className="pl-10"
              required
            />
          </div>

          <Textarea
            value={state.businessInfo.description}
            onChange={(e) => handleBusinessInfoChange('description', e.target.value)}
            placeholder="Business Description"
            rows={4}
            required
          />
        </div>
      </div>

      {/* Optional Fields */}
      <div className="space-y-4">
        <h3 className="font-medium">Additional Resources</h3>

        {/* File Upload */}
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept={ACCEPTED_FILE_TYPES}
            multiple
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center justify-center gap-2"
          >
            <Upload className="w-4 h-4" />
            Upload Files
          </Button>
          
          {state.uploadedFiles.length > 0 && (
            <ul className="mt-2 space-y-2">
              {state.uploadedFiles.map((file, index) => (
                <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{file.name}</span>
                  </div>
                  <button
                    onClick={() => handleRemoveFile(index)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* External Links */}
        <div>
          <Button
            type="button"
            variant="outline"
            onClick={handleAddLink}
            className="w-full flex items-center justify-center gap-2"
          >
            <Link2 className="w-4 h-4" />
            Add External Link
          </Button>

          {state.externalLinks.length > 0 && (
            <ul className="mt-2 space-y-2">
              {state.externalLinks.map((link, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Input
                    type="url"
                    value={link}
                    onChange={(e) => handleLinkChange(index, e.target.value)}
                    placeholder="https://example.com"
                  />
                  <button
                    onClick={() => handleRemoveLink(index)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Special Instructions */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-gray-400" />
            <h4 className="font-medium">Special Instructions</h4>
          </div>
          <Textarea
            value={state.specialInstructions}
            onChange={(e) => updateState({ specialInstructions: e.target.value })}
            placeholder="Add any special instructions or requirements (e.g., 'no medical claims')"
            rows={3}
          />
        </div>
      </div>
    </div>
  );
}
