import { useState } from 'react';
import { PlusCircle, MinusCircle } from 'lucide-react';
import { Course, Module } from '../../types';
import ModuleForm from './ModuleForm';

interface CourseFormProps {
  onSubmit: (course: Partial<Course>) => void;
}

const DEFAULT_TECHNOLOGIES = [
  'HTML',
  'CSS',
  'JavaScript',
  'React',
  'Node.js',
  'TypeScript',
  'Python',
  'Java'
];

export default function CourseForm({ onSubmit }: CourseFormProps) {
  const [course, setCourse] = useState<Partial<Course>>({
    title: '',
    description: '',
    level: 'beginner',
    technology: '',
    duration: '',
    type: 'quiz',
    objectives: [''],
  });
  
  const [modules, setModules] = useState<Module[]>([]);
  const [showModuleForm, setShowModuleForm] = useState(false);
  const [technologies, setTechnologies] = useState<string[]>(DEFAULT_TECHNOLOGIES);
  const [newTechnology, setNewTechnology] = useState('');
  const [showNewTechInput, setShowNewTechInput] = useState(false);

  const handleObjectiveChange = (index: number, value: string) => {
    const newObjectives = [...(course.objectives || [])];
    newObjectives[index] = value;
    setCourse({ ...course, objectives: newObjectives });
  };

  const addObjective = () => {
    setCourse({ ...course, objectives: [...(course.objectives || []), ''] });
  };

  const removeObjective = (index: number) => {
    const newObjectives = [...(course.objectives || [])];
    newObjectives.splice(index, 1);
    setCourse({ ...course, objectives: newObjectives });
  };

  const handleAddTechnology = () => {
    if (newTechnology.trim() && !technologies.includes(newTechnology.trim())) {
      setTechnologies([...technologies, newTechnology.trim()]);
      setCourse({ ...course, technology: newTechnology.trim() });
      setNewTechnology('');
      setShowNewTechInput(false);
    }
  };

  const handleModuleSubmit = (module: Partial<Module>) => {
    console.log('CourseForm handleModuleSubmit çalıştı');
    console.log('Mevcut modüller:', modules);
    
    setModules(prevModules => {
      const newModules = [...prevModules, { ...module, id: `m${modules.length + 1}` } as Module];
      console.log('Yeni modüller:', newModules);
      return newModules;
    });
    setShowModuleForm(false);
  };
  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit({
        ...course,
        modules: modules
      });
    } catch (error) {
      console.error('Kurs eklenirken hata:', error);
      alert('Kurs eklenirken bir hata oluştu.');
    }
  };

  return (
    <form onSubmit={handleFinalSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Course Title</label>
        <input
          type="text"
          required
          value={course.title}
          onChange={(e) => setCourse({ ...course, title: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          required
          value={course.description}
          onChange={(e) => setCourse({ ...course, description: e.target.value })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Level</label>
          <select
            required
            value={course.level}
            onChange={(e) => setCourse({ ...course, level: e.target.value as 'beginner' | 'intermediate' | 'advanced' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Technology</label>
          {showNewTechInput ? (
            <div className="flex mt-1 gap-2">
              <input
                type="text"
                value={newTechnology}
                onChange={(e) => setNewTechnology(e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter new technology"
              />
              <button
                type="button"
                onClick={handleAddTechnology}
                className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Add
              </button>
            </div>
          ) : (
            <div className="flex mt-1 gap-2">
              <select
                required
                value={course.technology}
                onChange={(e) => setCourse({ ...course, technology: e.target.value })}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select Technology</option>
                {technologies.map((tech) => (
                  <option key={tech} value={tech}>
                    {tech}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setShowNewTechInput(true)}
                className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                New
              </button>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Duration</label>
          <input
            type="text"
            required
            value={course.duration}
            onChange={(e) => setCourse({ ...course, duration: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="e.g., 2 hours"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Course Type</label>
          <select
            required
            value={course.type}
            onChange={(e) => setCourse({ ...course, type: e.target.value as 'quiz' | 'dragdrop' | 'coding' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="quiz">Quiz</option>
            <option value="dragdrop">Drag & Drop</option>
            <option value="coding">Coding</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Learning Objectives
        </label>
        <div className="space-y-2">
          {course.objectives?.map((objective, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                required
                value={objective}
                onChange={(e) => handleObjectiveChange(index, e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder={`Objective ${index + 1}`}
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeObjective(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <MinusCircle className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addObjective}
            className="flex items-center text-indigo-600 hover:text-indigo-700"
          >
            <PlusCircle className="h-5 w-5 mr-1" />
            Add Objective
          </button>
        </div>
      </div>

      <div className="border-t pt-6 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Modules</h3>
          <button
            type="button"
            onClick={() => setShowModuleForm(true)}
            className="flex items-center text-indigo-600 hover:text-indigo-700"
          >
            <PlusCircle className="h-5 w-5 mr-1" />
            Add Module
          </button>
        </div>

        {showModuleForm && (
          <div className="bg-gray-50 p-4 rounded-md mb-4">
            <ModuleForm
              courseType={course.type as 'quiz' | 'dragdrop' | 'coding'}
              technology={course.technology || ''}
              moduleNumber={modules.length + 1}
              onSubmit={handleModuleSubmit}
              onCancel={() => setShowModuleForm(false)}
            />
          </div>
        )}

        {modules.length > 0 && (
          <div className="space-y-2">
            {modules.map((module, index) => (
              <div key={module.id} className="p-4 bg-gray-50 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">{module.title}</h4>
                  <span className="text-sm text-gray-500">Ders {index + 1}</span>
                </div>
                <p className="text-sm text-gray-600">{module.content}</p>
                <div className="mt-2">
                  <p className="text-sm font-medium">Exercise Type: {module.exercise?.type}</p>
                  <p className="text-sm text-gray-600">{module.exercise?.question}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={modules.length === 0}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Create Course
      </button>
    </form>
  );
}