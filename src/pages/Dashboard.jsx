import React, { useState } from 'react'

import DashboardLayout from '../components/DashboardLayout.jsx';
import { dashboardStyles as styles } from '../assets/dummystyle.js'
import { useNavigate } from 'react-router-dom';
import { LucideFilePlus } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [allResumes, setallResumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resumeToDelete, setResumeToDelete] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  // Calculate completion percentage for a resume
  const calculateCompletion = (resume) => {
    let completedFields = 0;
    let totalFields = 0;

    // Profile Info
    totalFields += 3;
    if (resume.profileInfo?.fullName) completedFields++;
    if (resume.profileInfo?.designation) completedFields++;
    if (resume.profileInfo?.summary) completedFields++;

    // Contact Info
    totalFields += 2;
    if (resume.contactInfo?.email) completedFields++;
    if (resume.contactInfo?.phone) completedFields++;

    // Work Experience
    resume.workExperience?.forEach(exp => {
      totalFields += 5;
      if (exp.company) completedFields++;
      if (exp.role) completedFields++;
      if (exp.startDate) completedFields++;
      if (exp.endDate) completedFields++;
      if (exp.description) completedFields++;
    });

    // Education
    resume.education?.forEach(edu => {
      totalFields += 4;
      if (edu.degree) completedFields++;
      if (edu.institution) completedFields++;
      if (edu.startDate) completedFields++;
      if (edu.endDate) completedFields++;
    });

    // Skills
    resume.skills?.forEach(skill => {
      totalFields += 2;
      if (skill.name) completedFields++;
      if (skill.progress > 0) completedFields++;
    });

    // Projects
    resume.projects?.forEach(project => {
      totalFields += 4;
      if (project.title) completedFields++;
      if (project.description) completedFields++;
      if (project.github) completedFields++;
      if (project.liveDemo) completedFields++;
    });

    // Certifications
    resume.certifications?.forEach(cert => {
      totalFields += 3;
      if (cert.title) completedFields++;
      if (cert.issuer) completedFields++;
      if (cert.year) completedFields++;
    });

    // Languages
    resume.languages?.forEach(lang => {
      totalFields += 2;
      if (lang.name) completedFields++;
      if (lang.progress > 0) completedFields++;
    });

    // Interests
    totalFields += (resume.interests?.length || 0);
    completedFields += (resume.interests?.filter(i => i?.trim() !== "")?.length || 0);

    return Math.round((completedFields / totalFields) * 100);
  };

  const fetchAllResumes = async () => {

  }

  return (
    <DashboardLayout>
      <div className={styles.container}>
        <div className={styles.headerWrapper}>
          <div>
            <h1 className={styles.headerTitle}>My Resume</h1>
            <p className={styles.headerSubtitle}>{
              allResumes.length > 0
                ? `You have ${allResumes.length} resume${allResumes.length > 1 ? 's' : ''}`
                : 'Start building your professional resumes'
            }</p>
          </div>
          <div className='flex gap-4'>
            <button className={styles.createButton}
              onClick={() => setOpenCreateModal(true)}>
              <div className={styles.createButtonOverlay}></div>
              <span className={styles.createButtonContent}>Create Now
                <LucideFilePlus className="group-hover:translate-x-1 transition-transform" size={18} />
              </span>
            </button>
          </div>
        </div>
        {/*Loading states */}

      </div>
    </DashboardLayout>
  )
}
