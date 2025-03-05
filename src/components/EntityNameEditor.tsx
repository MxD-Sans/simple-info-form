
import React from 'react';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';

interface EntityNameEditorProps {
  entityName: string;
  isEditingName: boolean;
  tempEntityName: string;
  onEditClick: () => void;
  onSaveName: () => void;
  onCancelEdit: () => void;
  onTempNameChange: (name: string) => void;
}

const EntityNameEditor = ({
  entityName,
  isEditingName,
  tempEntityName,
  onEditClick,
  onSaveName,
  onCancelEdit,
  onTempNameChange
}: EntityNameEditorProps) => {
  return (
    <div className="mt-2 border-t border-blue-400 pt-2 flex items-center justify-between">
      {isEditingName ? (
        <div className="flex items-center gap-2 w-full">
          <input
            type="text"
            value={tempEntityName}
            onChange={(e) => onTempNameChange(e.target.value)}
            className="bg-white/10 text-white border border-blue-300 rounded px-2 py-1 w-full"
            placeholder="Enter entity name"
          />
          <Button
            size="sm"
            className="bg-green-500 hover:bg-green-600 text-white"
            onClick={onSaveName}
          >
            Save
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-white text-white hover:bg-blue-700"
            onClick={onCancelEdit}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-semibold text-white">
            {entityName || 'Enter entity name'}
          </h2>
          <Button
            size="sm"
            variant="secondary"
            className="bg-white text-black hover:bg-gray-100 text-xs px-2 py-1 h-7"
            onClick={onEditClick}
          >
            <Pencil size={14} className="mr-1" /> Edit
          </Button>
        </>
      )}
    </div>
  );
};

export default EntityNameEditor;
