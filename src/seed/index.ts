import mongoose from "mongoose";
import config from "../config";
import UserModel from "../app/modules/user/user.model";
import CompanyModel from "../app/modules/company/company.model";
import JobModel from "../app/modules/job/job.model";
import ApplicationModel from "../app/modules/application/application.model";

const DEMO_USERS = [
  { name: config.demo.admin.name, email: config.demo.admin.email, password: config.demo.admin.password, role: "admin" },
  { name: config.demo.recruiter.name, email: config.demo.recruiter.email, password: config.demo.recruiter.password, role: "recruiter" },
  { name: config.demo.candidate.name, email: config.demo.candidate.email, password: config.demo.candidate.password, role: "candidate" },
];

function assertDemoCredentials() {
  for (const user of DEMO_USERS) {
    if (!user.email || !user.password) {
      const prefix = `DEMO_${user.role.toUpperCase()}`;
      throw new Error(
        `Missing demo credential for role "${user.role}". Set ${prefix}_EMAIL and ${prefix}_PASSWORD in backend/.env (see backend/.env.example).`
      );
    }
  }
}

const SAMPLE_COMPANIES = [
  {
    name: "NexaByte",
    industry: "Technology",
    location: "San Francisco, USA",
    size: "51-200",
    description: "A fast-growing software company building developer tools used by thousands of teams worldwide.",
    verified: true,
    featured: true,
    plan: "Pro",
    tags: ["SaaS", "Developer Tools", "Cloud"],
  },
  {
    name: "CloudPeak",
    industry: "Technology",
    location: "Remote",
    size: "201-500",
    description: "Cloud infrastructure platform helping startups scale reliably with managed services and edge computing.",
    verified: true,
    featured: true,
    plan: "Enterprise",
    tags: ["Cloud", "DevOps", "Infrastructure"],
  },
  {
    name: "DataWorks",
    industry: "Technology",
    location: "Berlin, Germany",
    size: "11-50",
    description: "Data science consultancy specializing in machine learning, analytics pipelines, and AI strategy.",
    verified: false,
    featured: false,
    plan: "Free",
    tags: ["AI", "Data Science", "Analytics"],
  },
  {
    name: "DesignLab",
    industry: "Design",
    location: "New York, USA",
    size: "11-50",
    description: "A product design studio crafting delightful interfaces for mobile and web products.",
    verified: false,
    featured: false,
    plan: "Free",
    tags: ["UI/UX", "Design", "Product"],
  },
];

const SAMPLE_JOBS = [
  {
    title: "Senior Frontend Developer",
    company: "NexaByte",
    location: { type: "Remote", city: "", country: "USA" },
    category: "Frontend",
    summary: "Lead the frontend architecture of our flagship developer platform.",
    description: "We are looking for a Senior Frontend Developer to lead the frontend architecture of our developer platform, build reusable components, and mentor a growing team of engineers.",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salary: { min: 120000, max: 160000, currency: "USD", period: "year" },
    skills: ["React", "TypeScript", "Tailwind CSS", "GraphQL"],
    tags: ["Remote", "React", "Leadership"],
    status: "Active",
    featured: true,
    views: 340,
    applicantsCount: 18,
  },
  {
    title: "Backend Engineer (Node.js)",
    company: "CloudPeak",
    location: { type: "Onsite", city: "San Francisco", country: "USA" },
    category: "Backend",
    summary: "Design and scale REST APIs powering our cloud platform.",
    description: "Join the core platform team to design, build, and scale the REST APIs and microservices that power our cloud infrastructure platform.",
    employmentType: "Full-time",
    experienceLevel: "Mid",
    salary: { min: 110000, max: 145000, currency: "USD", period: "year" },
    skills: ["Node.js", "TypeScript", "PostgreSQL", "Docker"],
    tags: ["Backend", "APIs", "Microservices"],
    status: "Active",
    featured: false,
    views: 210,
    applicantsCount: 12,
  },
  {
    title: "Product Designer (UI/UX)",
    company: "DesignLab",
    location: { type: "Hybrid", city: "New York", country: "USA" },
    category: "UI / UX",
    summary: "Own the end-to-end design process for client products.",
    description: "We are hiring a Product Designer to own the end-to-end design process for our client products, from research and wireframes to polished interactive prototypes.",
    employmentType: "Contract",
    experienceLevel: "Mid",
    salary: { min: 60, max: 80, currency: "USD", period: "hour" },
    skills: ["Figma", "Prototyping", "User Research"],
    tags: ["Design", "Contract", "Hybrid"],
    status: "Active",
    featured: true,
    views: 150,
    applicantsCount: 9,
  },
  {
    title: "DevOps Engineer",
    company: "CloudPeak",
    location: { type: "Remote", city: "", country: "" },
    category: "DevOps",
    summary: "Automate infrastructure and improve CI/CD pipelines.",
    description: "Automate infrastructure provisioning and continuously improve CI/CD pipelines for our multi-region cloud platform.",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salary: { min: 130000, max: 170000, currency: "USD", period: "year" },
    skills: ["AWS", "Kubernetes", "Terraform", "CI/CD"],
    tags: ["DevOps", "AWS", "Kubernetes"],
    status: "Active",
    featured: false,
    views: 95,
    applicantsCount: 7,
  },
  {
    title: "Machine Learning Engineer",
    company: "DataWorks",
    location: { type: "Hybrid", city: "Berlin", country: "Germany" },
    category: "Machine Learning",
    summary: "Build and deploy ML models into production.",
    description: "Build and deploy machine learning models into production for clients across e-commerce, finance, and logistics.",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salary: { min: 90000, max: 120000, currency: "EUR", period: "year" },
    skills: ["Python", "PyTorch", "MLOps", "SQL"],
    tags: ["AI", "ML", "Berlin"],
    status: "Active",
    featured: false,
    views: 130,
    applicantsCount: 11,
  },
  {
    title: "Junior React Developer",
    company: "NexaByte",
    location: { type: "Remote", city: "", country: "" },
    category: "Frontend",
    summary: "Build delightful UIs alongside a supportive frontend team.",
    description: "Kickstart your career building delightful UIs with our frontend team. Great learning environment with strong mentorship.",
    employmentType: "Full-time",
    experienceLevel: "Junior",
    salary: { min: 65000, max: 85000, currency: "USD", period: "year" },
    skills: ["React", "JavaScript", "HTML/CSS"],
    tags: ["Junior", "Remote", "Mentorship"],
    status: "Active",
    featured: false,
    views: 260,
    applicantsCount: 24,
  },
  {
    title: "Fullstack Developer Intern",
    company: "DesignLab",
    location: { type: "Onsite", city: "New York", country: "USA" },
    category: "Fullstack",
    summary: "Hands-on internship building real client features.",
    description: "Hands-on internship where you will build real client features end-to-end with Node.js, React, and MongoDB.",
    employmentType: "Internship",
    experienceLevel: "Entry",
    salary: { min: 25, max: 35, currency: "USD", period: "hour" },
    skills: ["Node.js", "React", "MongoDB"],
    tags: ["Internship", "Entry Level"],
    status: "Draft",
    featured: false,
    views: 40,
    applicantsCount: 0,
  },
  {
    title: "Data Scientist (Freelance)",
    company: "DataWorks",
    location: { type: "Remote", city: "", country: "" },
    category: "Data Science",
    summary: "Short-term contract building analytics dashboards.",
    description: "Short-term freelance contract building analytics dashboards and ad-hoc insights for a retail client.",
    employmentType: "Freelance",
    experienceLevel: "Mid",
    salary: { min: 50, max: 70, currency: "USD", period: "hour" },
    skills: ["Python", "Pandas", "Tableau"],
    tags: ["Freelance", "Analytics"],
    status: "Active",
    featured: false,
    views: 75,
    applicantsCount: 5,
  },
];

async function run() {
  const fresh = process.argv.includes("--fresh");
  assertDemoCredentials();
  if (fresh) {
    await UserModel.deleteMany({});
    await CompanyModel.deleteMany({});
    await JobModel.deleteMany({});
    await ApplicationModel.deleteMany({});
    console.log("🧹 Cleared existing data (--fresh)");
  }

  // 1. Users (password hashed automatically by the model pre-save hook)
  const userMap: Record<string, string> = {};
  for (const demo of DEMO_USERS) {
    const exists = await UserModel.findOne({ email: demo.email }).lean();
    if (exists) {
      userMap[demo.role] = String(exists._id);
      console.log(`✔ User exists: ${demo.email} (${demo.role})`);
      continue;
    }
    const created = await UserModel.create(demo);
    userMap[demo.role] = String(created._id);
    console.log(`✔ Created user: ${demo.email} (${demo.role})`);
  }

  // 2. Companies
  const companyMap: Record<string, string> = {};
  for (const company of SAMPLE_COMPANIES) {
    const exists = await CompanyModel.findOne({ name: company.name }).lean();
    if (exists) {
      companyMap[company.name] = String(exists._id);
      console.log(`✔ Company exists: ${company.name}`);
      continue;
    }
    const created = await CompanyModel.create({
      ...company,
      user_id: userMap.recruiter ?? userMap.admin,
    } as any);
    companyMap[company.name] = String(created._id);
    console.log(`✔ Created company: ${company.name}`);
  }

  // 3. Jobs
  const jobIds: string[] = [];
  for (const job of SAMPLE_JOBS) {
    const exists = await JobModel.findOne({ title: job.title }).lean();
    if (exists) {
      jobIds.push(String(exists._id));
      console.log(`✔ Job exists: ${job.title}`);
      continue;
    }
    const created = await JobModel.create({
      ...job,
      user_id: userMap.recruiter ?? userMap.admin,
    } as any);
    jobIds.push(String(created._id));
    console.log(`✔ Created job: ${job.title}`);
  }

  // 4. Applications (candidate only, requires at least one job)
  const candidateId = userMap.candidate;
  if (candidateId && jobIds.length >= 3) {
    const sampleApplications = [
      { job_id: jobIds[0], status: "Pending" },
      { job_id: jobIds[5], status: "Reviewed" },
      { job_id: jobIds[1], status: "Interview" },
    ];
    for (const app of sampleApplications) {
      const filter: any = { job_id: app.job_id, user_id: candidateId };
      const exists = await ApplicationModel.findOne(filter).lean();
      if (exists) {
        console.log(`✔ Application exists for job ${app.job_id}`);
        continue;
      }
      await ApplicationModel.create({
        job_id: app.job_id,
        user_id: candidateId,
        name: config.demo.candidate.name,
        email: config.demo.candidate.email,
        resume_link: "https://example.com/resume-alex-morgan.pdf",
        cover_note: "I am excited about this role and believe my skills are a great fit.",
        status: app.status,
      } as any);
      await JobModel.findByIdAndUpdate(app.job_id as any, { $inc: { applicantsCount: 1 } });
      console.log(`✔ Created application for job ${app.job_id} (${app.status})`);
    }
  }

  // 5. Candidate profile + saved jobs (idempotent — always applies)
  if (candidateId) {
    await UserModel.findByIdAndUpdate(candidateId, {
      $set: {
        title: "Frontend Developer",
        location: "San Francisco, USA",
        bio: "Frontend developer with 4+ years of experience building accessible, high-performance web applications with React and TypeScript.",
        skills: ["React", "TypeScript", "Tailwind CSS", "Node.js", "GraphQL"],
        languages: ["English", "Spanish"],
        resume_link: "https://example.com/resume-alex-morgan.pdf",
        portfolio_link: "https://github.com/alexmorgan",
      },
    } as any);

    const experience = await UserModel.findOne({ _id: candidateId, "workExperience.title": "Frontend Developer" })
      .select("_id")
      .lean();
    if (!experience) {
      await UserModel.findByIdAndUpdate(candidateId, {
        $push: {
          workExperience: {
            title: "Frontend Developer",
            company: "Acme Inc",
            location: "San Francisco",
            startDate: "2021-03",
            current: true,
            description: "Build and maintain a large React codebase serving 1M+ monthly users.",
          },
          education: {
            school: "University of California, Berkeley",
            degree: "BSc",
            field: "Computer Science",
            startDate: "2015",
            endDate: "2019",
          },
          certificates: {
            name: "AWS Certified Developer",
            issuer: "Amazon Web Services",
            year: "2023",
          },
        },
      } as any);
    }

    if (jobIds.length >= 3) {
      await UserModel.findByIdAndUpdate(
        candidateId,
        { $addToSet: { savedJobs: { $each: [jobIds[0], jobIds[2]] } } },
        { new: true }
      );
    }
    console.log("✔ Candidate profile and saved jobs seeded");
  }

  console.log("\n✅ Seed completed.");
  console.log("Demo accounts (credentials from backend/.env):");
  for (const demo of DEMO_USERS) {
    console.log(`   ${demo.role.padEnd(9)} ${demo.email} / ${demo.password}`);
  }
}

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("Database connected, seeding...\n");
    await run();
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

main();
