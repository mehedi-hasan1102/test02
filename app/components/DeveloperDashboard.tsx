'use client';

import styles from './dashboard.module.css';
import Image from 'next/image';
import { FiGithub, FiStar, FiGitBranch, FiCode } from 'react-icons/fi';
import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface Project {
  id: number;
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  url?: string;
}

interface GithubStats {
  stars: number;
  forks: number;
  followers: number;
  repos: number;
}

interface UserProfile {
  name: string;
  title: string;
  bio: string;
  avatar?: string;
}

interface GithubRepository {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
}

// Project Card Component with Glow Effect
const ProjectCardItem = ({ project }: { project: Project }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(glowRef.current, {
      x: x,
      y: y,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleClick = () => {
    if (project.url) {
      window.open(project.url, '_blank');
    }
  };

  return (
    <div
      ref={cardRef}
      className={styles.projectCard}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      <div ref={glowRef} className={styles.projectGlow} />
      <h3 className={styles.projectName}>
        {project.name}
      </h3>
      <p className={styles.projectDescription}>{project.description}</p>
      <div className={styles.projectMeta}>
        <span className={styles.metaItem}>
          <FiCode size={14} /> {project.language}
        </span>
        <span className={styles.metaItem}>
          <FiStar size={14} /> {project.stars}
        </span>
        <span className={styles.metaItem}>
          <FiGitBranch size={14} /> {project.forks}
        </span>
      </div>
    </div>
  );
};

// Stats Card Component with Glow Effect
const StatsCardItem = ({ stats }: { stats: GithubStats }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(glowRef.current, {
      x: x,
      y: y,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <div
      ref={cardRef}
      className={`${styles.card} ${styles.statsCard}`}
      onMouseMove={handleMouseMove}
    >
      <div ref={glowRef} className={styles.cardGlow} />
      <h3 className={styles.sectionTitle} style={{ marginBottom: '1.5rem', position: 'relative', zIndex: 1 }}>
        <FiGithub /> GitHub Stats
      </h3>
      <div className={styles.statsGrid}>
        <div className={styles.statItem}>
          <div className={styles.statIcon}>⭐</div>
          <div className={styles.statValue}>{stats.stars.toLocaleString()}</div>
          <div className={styles.statLabel}>Stars</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statIcon}>🍴</div>
          <div className={styles.statValue}>{stats.forks}</div>
          <div className={styles.statLabel}>Forks</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statIcon}>👥</div>
          <div className={styles.statValue}>{stats.followers.toLocaleString()}</div>
          <div className={styles.statLabel}>Followers</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statIcon}>📦</div>
          <div className={styles.statValue}>{stats.repos}</div>
          <div className={styles.statLabel}>Repos</div>
        </div>
      </div>
    </div>
  );
};

// Contributions Card Component with Glow Effect
const ContributionsCardItem = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(glowRef.current, {
      x: x,
      y: y,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <div
      ref={cardRef}
      className={styles.card}
      onMouseMove={handleMouseMove}
    >
      <div ref={glowRef} className={styles.cardGlow} />
      <div className={styles.sectionHeader} style={{ position: 'relative', zIndex: 1 }}>
        <h2 className={styles.sectionTitle}>
          <FiCode /> Contributions
        </h2>
        <a href={`https://github.com/mehedi-hasan1102`} target="_blank" rel="noopener noreferrer" className={styles.viewLink}>
          View on GitHub <span>→</span>
        </a>
      </div>
      <div style={{ width: '100%', overflow: 'auto', marginTop: '1.5rem', position: 'relative', zIndex: 1 }}>
        <Image
          src="https://ghchart.rshah.org/22d3ee/mehedi-hasan1102"
          alt="GitHub contribution graph"
          width={1200}
          height={200}
          style={{ width: '100%', height: 'auto' }}
          unoptimized
        />
      </div>
    </div>
  );
};

const DeveloperDashboard = () => {
  // States
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'John Doe',
    title: 'Frontend Developer',
    bio: 'Crafting beautiful, performant web experiences. Passionate about design systems and user interfaces.',
  });

  const [stats, setStats] = useState<GithubStats>({
    stars: 0,
    forks: 0,
    followers: 0,
    repos: 0,
  });

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch GitHub Data
  const fetchGitHubData = async (username: string) => {
    try {
      // Fetch user data
      const userRes = await fetch(`https://api.github.com/users/${username}`);
      const userData = await userRes.json();
      
      setUserProfile(prev => ({
        ...prev,
        name: userData.name || username,
        bio: userData.bio || prev.bio,
      }));

      // Fetch all repositories to calculate total stats
      const allReposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
      const allReposData = await allReposRes.json() as GithubRepository[];

      // Calculate total stars and forks from all repos
      const totalStars = allReposData.reduce((sum: number, repo: GithubRepository) => sum + (repo.stargazers_count || 0), 0);
      const totalForks = allReposData.reduce((sum: number, repo: GithubRepository) => sum + (repo.forks_count || 0), 0);

      setStats({
        stars: totalStars,
        forks: totalForks,
        followers: userData.followers || 0,
        repos: userData.public_repos || 0,
      });

      // Get top 3 repos by stars for display
      const topRepos = allReposData
        .sort((a: GithubRepository, b: GithubRepository) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
        .slice(0, 3);

      const formattedProjects: Project[] = topRepos.map((repo: GithubRepository) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description || 'No description',
        language: repo.language || 'Unknown',
        stars: repo.stargazers_count || 0,
        forks: repo.forks_count || 0,
        url: repo.html_url,
      }));

      setProjects(formattedProjects);
    } catch (error) {
      console.error('Error fetching GitHub data:', error);
    }
  };

  // Initialize dashboard data
  useEffect(() => {
    const initDashboard = async () => {
      try {
        // Fetch GitHub data
        await fetchGitHubData('mehedi-hasan1102');
      } catch (error) {
        console.error('Error initializing dashboard:', error);
      } finally {
        // Always set loading to false, even if there's an error
        setLoading(false);
      }
    };

    initDashboard();
  }, []);

  if (loading) {
    return (
      <div className={styles.dashboard}>
        <div className={styles.dashboardContainer}>
          <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-secondary)' }}>
            Loading dashboard...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardContainer}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.headerTitle}>
            Developer <span className={styles.titleAccent}>Dashboard</span>
          </h1>
        </div>

        {/* Main Grid with Profile, Stats, and Now Playing */}
        <div className={styles.mainGrid}>
          {/* Profile Card */}
          <div className={`${styles.card} ${styles.profileCard}`}>
            <div className={styles.profileContent}>
              <Image 
                src="/profile/profile - blue.png" 
                alt={userProfile.name}
                width={48}
                height={48}
                className={styles.profileAvatar}
              />
              <div>
                <div className={styles.profileName}>{userProfile.name}</div>
              </div>
              <p className={styles.profileBio}>{userProfile.bio}</p>
            </div>
          </div>

          {/* GitHub Stats Card */}
          <StatsCardItem stats={stats} />
        </div>

        {/* Contributions Section */}
        <div className={styles.contributionsSection}>
          <ContributionsCardItem />
        </div>

        {/* Recent Projects Section */}
        <div className={styles.projectsSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Recent Projects</h2>
            <a href="https://github.com/mehedi-hasan1102" target="_blank" rel="noopener noreferrer" className={styles.viewLink}>
              View all <span>→</span>
            </a>
          </div>
          <div className={styles.projectsGrid}>
            {projects.length > 0 ? (
              projects.map((project) => <ProjectCardItem key={project.id} project={project} />)
            ) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>
                Loading projects...
              </div>
            )}
          </div>
        </div>

        {/* Spotify Section */}
        <div className={styles.playlistSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>🎵 My Playlist</h2>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>What I listen to while coding</span>
          </div>
          <div className={`${styles.card}`} style={{ padding: 0, overflow: 'hidden' }}>
            <iframe
              style={{ borderRadius: '12px' }}
              src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator&theme=0"
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperDashboard;
