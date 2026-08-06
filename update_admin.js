const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'app', 'admin', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add CandidateApplicationEntry type
const typeInsertion = `type CareerEntry = {
  id: string;
  position: string;
  experience: string;
  mode: string;
  salary: string;
  submittedAt: any;
};

type CandidateApplicationEntry = {
  id: string;
  jobId: string;
  jobPosition: string;
  name: string;
  email: string;
  phone: string;
  age: string;
  gender: string;
  experience: string;
  location: string;
  submittedAt: any;
};`;
content = content.replace(/type CareerEntry = \{[\s\S]*?\};\n/, typeInsertion + '\n');

// 2. Update activeTab and state
const activeTabOld = `const [activeTab, setActiveTab] = useState<'projects' | 'ideas' | 'offers' | 'offer_leads' | 'complaints' | 'launches' | 'careers'>('projects');`;
const activeTabNew = `const [activeTab, setActiveTab] = useState<'projects' | 'ideas' | 'offers' | 'offer_leads' | 'complaints' | 'launches' | 'careers' | 'applications'>('projects');`;
content = content.replace(activeTabOld, activeTabNew);

const careersStateOld = `const [careers, setCareers] = useState<CareerEntry[]>([]);`;
const careersStateNew = `const [careers, setCareers] = useState<CareerEntry[]>([]);\n  const [candidateApplications, setCandidateApplications] = useState<CandidateApplicationEntry[]>([]);`;
content = content.replace(careersStateOld, careersStateNew);

// 3. Update fetchData
const fetchDataOld = `      } else if (activeTab === 'careers') {
        const q = query(collection(db, 'career_applications'), orderBy('submittedAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetched: CareerEntry[] = [];
        querySnapshot.forEach((doc) => {
          fetched.push({ id: doc.id, ...doc.data() } as CareerEntry);
        });
        setCareers(fetched);
      }
    } catch (err) {`;
const fetchDataNew = `      } else if (activeTab === 'careers') {
        const q = query(collection(db, 'career_applications'), orderBy('submittedAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetched: CareerEntry[] = [];
        querySnapshot.forEach((doc) => {
          fetched.push({ id: doc.id, ...doc.data() } as CareerEntry);
        });
        setCareers(fetched);
      } else if (activeTab === 'applications') {
        const q = query(collection(db, 'candidate_applications'), orderBy('submittedAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetched: CandidateApplicationEntry[] = [];
        querySnapshot.forEach((doc) => {
          fetched.push({ id: doc.id, ...doc.data() } as CandidateApplicationEntry);
        });
        setCandidateApplications(fetched);
      }
    } catch (err) {`;
content = content.replace(fetchDataOld, fetchDataNew);

// 4. Tab Navigation button
const tabNavOld = `              <button 
                onClick={() => setActiveTab('careers')}
                className={\`px-4 py-2 rounded-lg text-sm font-bold transition-all \${
                  activeTab === 'careers' ? 'bg-pink-500/20 text-pink-400' : 'text-white/50 hover:text-white hover:bg-white/5'
                }\`}
              >
                Careers
              </button>
            </nav>
          </aside>
`;
const tabNavNew = `              <button 
                onClick={() => setActiveTab('careers')}
                className={\`px-4 py-2 rounded-lg text-sm font-bold transition-all \${
                  activeTab === 'careers' ? 'bg-pink-500/20 text-pink-400' : 'text-white/50 hover:text-white hover:bg-white/5'
                }\`}
              >
                Job Postings
              </button>
              <button 
                onClick={() => setActiveTab('applications')}
                className={\`px-4 py-2 rounded-lg text-sm font-bold transition-all \${
                  activeTab === 'applications' ? 'bg-[#A068FF]/20 text-[#A068FF]' : 'text-white/50 hover:text-white hover:bg-white/5'
                }\`}
              >
                Applications
              </button>
            </nav>
          </aside>
`;
content = content.replace(tabNavOld, tabNavNew);

// 5. Header Texts
const headerTitleOld = `{activeTab === 'careers' && "Careers"}`;
const headerTitleNew = `{activeTab === 'careers' && "Job Postings"}\n              {activeTab === 'applications' && "Candidate Applications"}`;
content = content.replace(headerTitleOld, headerTitleNew);

const headerDescOld = `{activeTab === 'careers' && "Review candidates who applied to join the Flyggo team."}`;
const headerDescNew = `{activeTab === 'careers' && "Create and manage job openings on your careers page."}\n              {activeTab === 'applications' && "Review candidates who applied to join the Flyggo team."}`;
content = content.replace(headerDescOld, headerDescNew);

// 6. Table Headers
const tableHeadersOld = `                  {activeTab === 'careers' && (
                    <>
                      <th className="px-6 py-4 font-medium">Position</th>
                      <th className="px-6 py-4 font-medium">Experience</th>
                      <th className="px-6 py-4 font-medium">Mode</th>
                      <th className="px-6 py-4 font-medium">Expected Salary</th>
                      <th className="px-6 py-4 font-medium">Posted</th>
                      <th className="px-6 py-4 font-medium w-32">Actions</th>
                    </>
                  )}`;
const tableHeadersNew = `                  {activeTab === 'careers' && (
                    <>
                      <th className="px-6 py-4 font-medium">Position</th>
                      <th className="px-6 py-4 font-medium">Experience</th>
                      <th className="px-6 py-4 font-medium">Mode</th>
                      <th className="px-6 py-4 font-medium">Expected Salary</th>
                      <th className="px-6 py-4 font-medium">Posted</th>
                      <th className="px-6 py-4 font-medium w-32">Actions</th>
                    </>
                  )}
                  {activeTab === 'applications' && (
                    <>
                      <th className="px-6 py-4 font-medium">Candidate</th>
                      <th className="px-6 py-4 font-medium">Contact</th>
                      <th className="px-6 py-4 font-medium">Details</th>
                      <th className="px-6 py-4 font-medium">Experience</th>
                      <th className="px-6 py-4 font-medium">Applied Date</th>
                      <th className="px-6 py-4 font-medium w-32">Actions</th>
                    </>
                  )}`;
content = content.replace(tableHeadersOld, tableHeadersNew);

// 7. No records check
const noRecordsOld = `activeTab === 'careers' && careers.length === 0`;
const noRecordsNew = `activeTab === 'careers' && careers.length === 0 ||\n                  activeTab === 'applications' && candidateApplications.length === 0`;
content = content.replace(noRecordsOld, noRecordsNew);

// 8. Table Body
const tableBodyOld = `                {activeTab === 'careers' && (
                  <>
                    {careers.map((career) => (`;
const tableBodyNew = `                {activeTab === 'applications' && (
                  <>
                    {candidateApplications.map((app) => (
                      <tr key={app.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                          <div className="text-white font-bold">{app.name}</div>
                          <div className="text-xs text-[#A068FF] mt-1 font-semibold uppercase tracking-wider">{app.jobPosition}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-white/70">
                          <div><a href={\`mailto:\${app.email}\`} className="text-cyan-400 hover:underline">{app.email}</a></div>
                          <div>{app.phone}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-white/70">
                          <div><span className="text-white/40">Age:</span> {app.age}</div>
                          <div><span className="text-white/40">Gender:</span> {app.gender}</div>
                          <div><span className="text-white/40">Loc:</span> {app.location}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-white/70 max-w-[250px]">
                          <div className="line-clamp-3" title={app.experience}>{app.experience}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-white/50">
                          {app.submittedAt?.toDate().toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <button 
                            onClick={() => handleDelete('candidate_applications', app.id)}
                            className="bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 px-3 py-1 rounded text-xs font-semibold transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </>
                )}
                
                {activeTab === 'careers' && (
                  <>
                    {careers.map((career) => (`;
content = content.replace(tableBodyOld, tableBodyNew);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Successfully updated src/app/admin/page.tsx");
