
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

interface FormValues {
  [key: string]: any;
}

interface SavedEntity {
  name: string;
  data: FormValues;
}

export function useEntityForm() {
  const [formValues, setFormValues] = useState<FormValues>({});
  const [submitting, setSubmitting] = useState(false);
  const [entityName, setEntityName] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempEntityName, setTempEntityName] = useState("");
  const [savedEntities, setSavedEntities] = useState<SavedEntity[]>([]);

  // Load saved entities from localStorage
  const loadSavedEntities = () => {
    const entities = localStorage.getItem('savedEntities');
    if (entities) {
      setSavedEntities(JSON.parse(entities));
    }
  };

  // Handle field changes
  const handleFieldChange = (id: string, value: any) => {
    const normalizedId = id.replace(/\./g, '_');
    if (id === 'b_01.01.0020') {
      setEntityName(value || '');
    }
    setFormValues((prev) => ({
      ...prev,
      [normalizedId]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    saveEntityData();
    setTimeout(() => {
      console.log('Form submitted with values:', formValues);
      toast({
        title: "Form submitted successfully",
        description: "Your entity information has been registered and saved.",
      });
      setSubmitting(false);
    }, 1000);
  };

  // Save entity data
  const saveEntityData = () => {
    if (!entityName) {
      toast({
        title: "Error saving entity",
        description: "Entity name is required to save data.",
        variant: "destructive",
      });
      return;
    }

    const entityToSave: SavedEntity = {
      name: entityName,
      data: { ...formValues }
    };

    const existingIndex = savedEntities.findIndex(entity => entity.name === entityName);
    let updatedEntities: SavedEntity[];

    if (existingIndex >= 0) {
      updatedEntities = [...savedEntities];
      updatedEntities[existingIndex] = entityToSave;
    } else {
      updatedEntities = [...savedEntities, entityToSave];
    }

    setSavedEntities(updatedEntities);
    localStorage.setItem('savedEntities', JSON.stringify(updatedEntities));

    toast({
      title: "Entity saved",
      description: `Entity "${entityName}" has been saved successfully.`,
    });
  };

  // Handle loading entity
  const handleLoadEntity = (entityNameToLoad: string) => {
    const entityToLoad = savedEntities.find(entity => entity.name === entityNameToLoad);
    
    if (entityToLoad) {
      setFormValues(entityToLoad.data);
      setEntityName(entityToLoad.name);
      
      toast({
        title: "Entity loaded",
        description: `Entity "${entityNameToLoad}" has been loaded successfully.`,
      });
    }
  };

  // Handle creating new entity
  const handleNewEntity = () => {
    setFormValues({});
    setEntityName("");
    
    toast({
      title: "New entity created",
      description: "You can now enter information for a new entity.",
    });
  };

  // Entity name editing functions
  const handleEditNameClick = () => {
    setTempEntityName(entityName);
    setIsEditingName(true);
  };

  const handleSaveName = () => {
    setEntityName(tempEntityName);
    setIsEditingName(false);
    
    const normalizedId = 'b_01.01.0020'.replace(/\./g, '_');
    setFormValues((prev) => ({
      ...prev,
      [normalizedId]: tempEntityName,
    }));
  };

  const handleCancelEdit = () => {
    setIsEditingName(false);
  };

  return {
    formValues,
    entityName,
    isEditingName,
    tempEntityName,
    savedEntities,
    submitting,
    setTempEntityName,
    handleFieldChange,
    handleSubmit,
    handleLoadEntity,
    handleNewEntity,
    handleEditNameClick,
    handleSaveName,
    handleCancelEdit,
    saveEntityData,
    loadSavedEntities
  };
}

export type EntityFormHook = ReturnType<typeof useEntityForm>;
