import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Code, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Master Web Development with DevLearn
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Learn from industry experts, build real projects, and advance your career with our comprehensive web development courses.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/register"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </Link>
              <Link
                to="/courses"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Browse courses <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <div className="flex justify-center">
                <BookOpen className="h-16 w-16 text-indigo-600" />
              </div>
              <h3 className="text-base font-semibold leading-7 text-gray-900">Comprehensive Curriculum</h3>
              <p className="text-sm leading-6 text-gray-600">Learn everything from HTML basics to advanced React applications</p>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <div className="flex justify-center">
                <Code className="h-16 w-16 text-indigo-600" />
              </div>
              <h3 className="text-base font-semibold leading-7 text-gray-900">Interactive Learning</h3>
              <p className="text-sm leading-6 text-gray-600">Practice with real-world projects and get instant feedback</p>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <div className="flex justify-center">
                <Users className="h-16 w-16 text-indigo-600" />
              </div>
              <h3 className="text-base font-semibold leading-7 text-gray-900">Community Support</h3>
              <p className="text-sm leading-6 text-gray-600">Join a community of learners and help each other grow</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}