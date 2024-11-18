import { Course, User } from '../types';

export const currentUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'admin',
  progress: {
    completedCourses: 3,
    totalPoints: 1250,
    streak: 7,
  },
};

export const courses: Course[] = [
  {
    id: '1',
    title: 'JavaScript Fundamentals',
    description: 'Master JavaScript basics with interactive quizzes',
    level: 'beginner',
    technology: 'javascript',
    duration: '4 hours',
    type: 'quiz',
    progress: 0,
    objectives: [
      'Understand JavaScript data types',
      'Master control flow statements',
      'Learn function declarations and expressions',
    ],
    modules: [
      {
        id: 'm1',
        title: 'Variables and Data Types',
        type: 'quiz',
        content: 'Learn about JavaScript variables and primitive data types.',
        completed: false,
        exercise: {
          type: 'quiz',
          question: 'Which keyword is used to declare a constant variable in JavaScript?',
          options: ['var', 'let', 'const', 'define'],
          correctAnswer: 'const'
        }
      },
      {
        id: 'm2',
        title: 'Control Flow Statements',
        type: 'quiz',
        content: 'Understanding if statements, loops, and conditional operators.',
        completed: false,
        exercise: {
          type: 'quiz',
          question: 'What is the correct syntax for an if statement in JavaScript?',
          options: [
            'if (condition) { }',
            'if condition { }',
            'if [condition] { }',
            'if condition then { }'
          ],
          correctAnswer: 'if (condition) { }'
        }
      },
      {
        id: 'm3',
        title: 'Functions',
        type: 'quiz',
        content: 'Learn about function declarations, expressions, and arrow functions.',
        completed: false,
        exercise: {
          type: 'quiz',
          question: 'Which of the following is an arrow function?',
          options: [
            'function() { }',
            '() => { }',
            'const func = function() { }',
            'function func() { }'
          ],
          correctAnswer: '() => { }'
        }
      }
    ]
  },
  {
    id: '2',
    title: 'CSS Layout Mastery',
    description: 'Learn modern CSS layouts through interactive exercises',
    level: 'intermediate',
    technology: 'css',
    duration: '6 hours',
    type: 'quiz',
    progress: 0,
    objectives: [
      'Master Flexbox layout',
      'Understand CSS Grid',
      'Learn responsive design patterns',
    ],
    modules: [
      {
        id: 'm1',
        title: 'Flexbox Basics',
        type: 'quiz',
        content: 'Understanding the fundamentals of Flexbox layout.',
        completed: false,
        exercise: {
          type: 'quiz',
          question: 'Which property is used to align items along the main axis in Flexbox?',
          options: [
            'align-items',
            'justify-content',
            'align-content',
            'flex-align'
          ],
          correctAnswer: 'justify-content'
        }
      },
      {
        id: 'm2',
        title: 'CSS Grid Layout',
        type: 'quiz',
        content: 'Learn how to create complex layouts with CSS Grid.',
        completed: false,
        exercise: {
          type: 'quiz',
          question: 'Which CSS Grid property is used to define column sizes?',
          options: [
            'grid-template-rows',
            'grid-template-columns',
            'grid-template-areas',
            'grid-auto-columns'
          ],
          correctAnswer: 'grid-template-columns'
        }
      },
      {
        id: 'm3',
        title: 'Responsive Design',
        type: 'quiz',
        content: 'Master responsive design techniques and media queries.',
        completed: false,
        exercise: {
          type: 'quiz',
          question: 'What is the correct syntax for a media query?',
          options: [
            '@media screen (max-width: 768px)',
            '@media (max-width: 768px)',
            '@screen max-width(768px)',
            '@responsive max-width: 768px'
          ],
          correctAnswer: '@media (max-width: 768px)'
        }
      }
    ]
  },
  {
    id: '3',
    title: 'React Hooks in Action',
    description: 'Master React Hooks with practical examples',
    level: 'advanced',
    technology: 'react',
    duration: '8 hours',
    type: 'quiz',
    progress: 0,
    objectives: [
      'Understand React Hooks lifecycle',
      'Master state management with hooks',
      'Learn custom hooks development',
    ],
    modules: [
      {
        id: 'm1',
        title: 'useState Hook',
        type: 'quiz',
        content: 'Learn how to manage state in functional components.',
        completed: false,
        exercise: {
          type: 'quiz',
          question: 'What is the correct way to declare state using useState?',
          options: [
            'const state = useState(initialValue)',
            'const [state, setState] = useState(initialValue)',
            'const {state, setState} = useState(initialValue)',
            'const state = new useState(initialValue)'
          ],
          correctAnswer: 'const [state, setState] = useState(initialValue)'
        }
      },
      {
        id: 'm2',
        title: 'useEffect Hook',
        type: 'quiz',
        content: 'Understanding side effects in React components.',
        completed: false,
        exercise: {
          type: 'quiz',
          question: 'When does useEffect run?',
          options: [
            'Only on component mount',
            'After every render',
            'Only when dependencies change',
            'Before component renders'
          ],
          correctAnswer: 'After every render'
        }
      },
      {
        id: 'm3',
        title: 'Custom Hooks',
        type: 'quiz',
        content: 'Learn how to create and use custom hooks.',
        completed: false,
        exercise: {
          type: 'quiz',
          question: 'What is the naming convention for custom hooks?',
          options: [
            'They must start with "use"',
            'They must end with "Hook"',
            'They can have any name',
            'They must be all uppercase'
          ],
          correctAnswer: 'They must start with "use"'
        }
      }
    ]
  }
];