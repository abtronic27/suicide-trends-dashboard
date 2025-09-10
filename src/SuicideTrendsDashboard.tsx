import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Cell, AreaChart, Area } from 'recharts';

const SuicideTrendsDashboard: React.FC = () => {
  const [selectedView, setSelectedView] = useState<'overview' | 'trends' | 'ageGroups' | 'detailed'>('overview');
  const [selectedAges, setSelectedAges] = useState<number[]>([10, 12, 14, 15, 16, 17]);
  
  const rawData = [
    {age: 2, 2015: 1, 2016: 3, 2017: 0, 2018: 1, 2019: 1, 2020: 0, 2021: 2, 2022: 1, 2023: 0, 2024: 0, total: 9},
    {age: 3, 2015: 1, 2016: 0, 2017: 0, 2018: 0, 2019: 0, 2020: 0, 2021: 1, 2022: 1, 2023: 0, 2024: 0, total: 3},
    {age: 4, 2015: 1, 2016: 1, 2017: 1, 2018: 0, 2019: 0, 2020: 0, 2021: 0, 2022: 0, 2023: 1, 2024: 0, total: 4},
    {age: 5, 2015: 1, 2016: 3, 2017: 2, 2018: 1, 2019: 0, 2020: 0, 2021: 0, 2022: 4, 2023: 0, 2024: 0, total: 11},
    {age: 6, 2015: 21, 2016: 19, 2017: 27, 2018: 27, 2019: 34, 2020: 21, 2021: 23, 2022: 29, 2023: 19, 2024: 21, total: 241},
    {age: 7, 2015: 44, 2016: 36, 2017: 50, 2018: 45, 2019: 47, 2020: 47, 2021: 39, 2022: 54, 2023: 55, 2024: 45, total: 462},
    {age: 8, 2015: 70, 2016: 91, 2017: 92, 2018: 86, 2019: 100, 2020: 89, 2021: 82, 2022: 100, 2023: 92, 2024: 109, total: 911},
    {age: 9, 2015: 71, 2016: 82, 2017: 99, 2018: 102, 2019: 127, 2020: 118, 2021: 108, 2022: 122, 2023: 119, 2024: 121, total: 1069},
    {age: 10, 2015: 180, 2016: 233, 2017: 256, 2018: 279, 2019: 349, 2020: 372, 2021: 364, 2022: 382, 2023: 406, 2024: 420, total: 3241},
    {age: 11, 2015: 591, 2016: 809, 2017: 990, 2018: 1113, 2019: 1248, 2020: 1384, 2021: 1386, 2022: 1421, 2023: 1411, 2024: 1454, total: 11807},
    {age: 12, 2015: 2361, 2016: 3147, 2017: 3756, 2018: 4255, 2019: 4698, 2020: 4926, 2021: 5001, 2022: 4956, 2023: 4828, 2024: 4730, total: 42658},
    {age: 13, 2015: 6149, 2016: 7632, 2017: 8754, 2018: 9533, 2019: 10016, 2020: 10103, 2021: 10154, 2022: 9895, 2023: 9610, 2024: 9531, total: 91377},
    {age: 14, 2015: 9669, 2016: 11559, 2017: 12771, 2018: 13317, 2019: 13459, 2020: 13088, 2021: 13379, 2022: 12851, 2023: 12309, 2024: 12024, total: 130386},
    {age: 15, 2015: 13547, 2016: 15224, 2017: 16312, 2018: 16328, 2019: 16243, 2020: 15440, 2021: 15999, 2022: 15374, 2023: 14721, 2024: 15454, total: 154642},
    {age: 16, 2015: 13718, 2016: 15183, 2017: 16165, 2018: 15993, 2019: 15588, 2020: 14901, 2021: 15417, 2022: 14727, 2023: 13927, 2024: 14909, total: 149928},
    {age: 17, 2015: 11753, 2016: 13008, 2017: 13713, 2018: 13459, 2019: 13177, 2020: 12567, 2021: 13222, 2022: 12578, 2023: 12006, 2024: 12920, total: 129363},
    {age: 18, 2015: 9073, 2016: 10321, 2017: 10989, 2018: 11349, 2019: 11372, 2020: 10621, 2021: 11579, 2022: 11206, 2023: 10362, 2024: 9852, total: 106724},
    {age: 19, 2015: 8050, 2016: 8926, 2017: 9849, 2018: 10415, 2019: 10336, 2020: 9878, 2021: 10355, 2022: 9816, 2023: 9211, 2024: 8982, total: 95818}
  ] as const;

  const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024] as const;

  const yearlyData = useMemo(() => {
    return years.map((year) => {
      const dataPoint: any = { year };
      rawData.forEach((ageGroup) => {
        dataPoint[`Age ${ageGroup.age}`] = ageGroup[year];
      });
      dataPoint.total = rawData.reduce((sum, ageGroup) => sum + ageGroup[year], 0);
      return dataPoint;
    });
  }, []);

  const trendAnalysis = useMemo(() => {
    return rawData.map((ageData) => {
      const percentChange = ((ageData[2024] - ageData[2015]) / ageData[2015] * 100);
      const avgAnnual = (Math.pow(ageData[2024] / ageData[2015], 1/9) - 1) * 100;
      return {
        age: ageData.age,
        percentChange,
        avgAnnualChange: avgAnnual,
        start2015: ageData[2015],
        end2024: ageData[2024],
        total: ageData.total,
        category: ageData.age <= 12 ? 'Children (≤12)' : ageData.age <= 15 ? 'Early Teens (13-15)' : 'Late Teens (16-19)'
      };
    }).sort((a, b) => b.percentChange - a.percentChange);
  }, []);

  const ageGroupData = useMemo(() => {
    const children = rawData.filter(d => d.age <= 12);
    const earlyTeens = rawData.filter(d => d.age >= 13 && d.age <= 15);
    const lateTeens = rawData.filter(d => d.age >= 16 && d.age <= 19);
    return years.map((year) => ({
      year,
      'Children (≤12)': children.reduce((sum, age) => sum + age[year], 0),
      'Early Teens (13-15)': earlyTeens.reduce((sum, age) => sum + age[year], 0),
      'Late Teens (16-19)': lateTeens.reduce((sum, age) => sum + age[year], 0),
    }));
  }, []);

  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1', '#d084d0', '#ffb347', '#87ceeb'];

  const badgeColor = (groupName: string) => {
    if (groupName.includes('Children')) return 'border-blue-500';
    if (groupName.includes('Early Teens')) return 'border-green-500';
    return 'border-yellow-500';
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Poison Control Center Calls, Suicide Attempt Trends Analysis (2015 to 2024)
          </h1>
          <p className="text-gray-600">
            Analysis of {rawData.reduce((sum, age) => sum + age.total, 0).toLocaleString()} total calls across ages 2 to 19
          </p>
        </div>

        <div className="flex gap-4 mb-6 flex-wrap">
          {[
            {key: 'overview', label: 'Overview'},
            {key: 'trends', label: 'Trend Analysis'},
            {key: 'ageGroups', label: 'Age Group Comparison'},
            {key: 'detailed', label: 'Detailed View'}
          ].map((view) => (
            <button
              key={view.key}
              onClick={() => setSelectedView(view.key as any)}
              className={`px-4 py-2 rounded-lg font-medium ${selectedView === view.key ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              {view.label}
            </button>
          ))}
        </div>

        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <h3 className="text-lg font-medium text-red-800 mb-2">Key Findings</h3>
          <ul className="text-red-700 space-y-1">
            <li>• <strong>Younger ages show notable increases:</strong> Ages 10 to 12 have increased significantly</li>
            <li>• <strong>Peak call volume:</strong> Ages 14 to 16 account for the highest absolute numbers</li>
            <li>• <strong>Overall trend:</strong> Most age groups show increasing call volumes over the decade</li>
            <li>• <strong>2021 spike:</strong> Increase across multiple age groups during the pandemic</li>
          </ul>
        </div>

        {selectedView === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Total Calls by Year</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={yearlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip formatter={(value: any) => [Number(value).toLocaleString(), 'Calls']} />
                  <Area type="monotone" dataKey="total" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Percent Change by Age, 2015 to 2024</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={trendAnalysis.slice(0, 10)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="age" />
                  <YAxis />
                  <Tooltip formatter={(value: any) => [`${Number(value).toFixed(1)}%`, 'Change']} />
                  <Bar dataKey="percentChange">
                    {trendAnalysis.slice(0, 10).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.percentChange > 50 ? '#ff4444' : entry.percentChange > 20 ? '#ff8844' : '#4488ff'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {selectedView === 'trends' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Trends by Age, high volume</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={yearlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {selectedAges.map((age, index) => (
                    <Line 
                      key={age}
                      type="monotone" 
                      dataKey={`Age ${age}`}
                      stroke={colors[index % colors.length]}
                      strokeWidth={2}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
              
              <div className="mt-4">
                <h4 className="font-medium mb-2">Select ages to display</h4>
                <div className="flex flex-wrap gap-2">
                  {rawData.filter(d => d.total > 1000).map(ageData => (
                    <button
                      key={ageData.age}
                      onClick={() => {
                        if (selectedAges.includes(ageData.age)) {
                          setSelectedAges(selectedAges.filter(a => a !== ageData.age));
                        } else if (selectedAges.length < 8) {
                          setSelectedAges([...selectedAges, ageData.age]);
                        }
                      }}
                      className={`px-3 py-1 rounded text-sm ${selectedAges.includes(ageData.age) ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                      Age {ageData.age}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Trend Analysis Table</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-2 text-left">Age</th>
                      <th className="px-4 py-2 text-right">2015 Calls</th>
                      <th className="px-4 py-2 text-right">2024 Calls</th>
                      <th className="px-4 py-2 text-right">% Change</th>
                      <th className="px-4 py-2 text-right">Total, 2015 to 2024</th>
                      <th className="px-4 py-2 text-left">Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trendAnalysis.slice(0, 15).map((item, index) => (
                      <tr key={item.age} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-4 py-2 font-medium">{item.age}</td>
                        <td className="px-4 py-2 text-right">{item.start2015.toLocaleString()}</td>
                        <td className="px-4 py-2 text-right">{item.end2024.toLocaleString()}</td>
                        <td className={`px-4 py-2 text-right font-medium ${item.percentChange > 50 ? 'text-red-600' : item.percentChange > 20 ? 'text-orange-600' : item.percentChange > 0 ? 'text-yellow-600' : 'text-green-600'}`}>
                          {item.percentChange.toFixed(1)}%
                        </td>
                        <td className="px-4 py-2 text-right">{item.total.toLocaleString()}</td>
                        <td className="px-4 py-2">{item.category}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {selectedView === 'ageGroups' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Age Group Comparison Over Time</h3>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={ageGroupData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip formatter={(value: any) => [Number(value).toLocaleString(), 'Calls']} />
                  <Legend />
                  <Area type="monotone" dataKey="Children (≤12)" stackId="1" stroke="#8884d8" fill="#8884d8" />
                  <Area type="monotone" dataKey="Early Teens (13-15)" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                  <Area type="monotone" dataKey="Late Teens (16-19)" stackId="1" stroke="#ffc658" fill="#ffc658" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {name: 'Children (≤12)', data: rawData.filter(d => d.age <= 12)},
                {name: 'Early Teens (13-15)', data: rawData.filter(d => d.age >= 13 && d.age <= 15)},
                {name: 'Late Teens (16-19)', data: rawData.filter(d => d.age >= 16 && d.age <= 19)},
              ].map(group => {
                const total2015 = group.data.reduce((sum, age) => sum + age[2015], 0);
                const total2024 = group.data.reduce((sum, age) => sum + age[2024], 0);
                const change = ((total2024 - total2015) / total2015 * 100);
                const borderClass = badgeColor(group.name);
                return (
                  <div key={group.name} className={`bg-white p-4 rounded-lg shadow border-l-4 ${borderClass}`}>
                    <h4 className="font-semibold text-lg mb-2">{group.name}</h4>
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="text-gray-600">2015:</span> <span className="font-medium">{total2015.toLocaleString()}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">2024:</span> <span className="font-medium">{total2024.toLocaleString()}</span>
                      </div>
                      <div className={`text-sm font-medium ${change > 20 ? 'text-red-600' : change > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                        {change > 0 ? '+' : ''}{change.toFixed(1)}% change
                      </div>
                      <div className="text-xs text-gray-500">
                        Total decade: {group.data.reduce((sum, age) => sum + age.total, 0).toLocaleString()}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {selectedView === 'detailed' && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Complete Data Table</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-3 py-2 text-left">Age</th>
                    {years.map((year) => (
                      <th key={year} className="px-3 py-2 text-right">{year}</th>
                    ))}
                    <th className="px-3 py-2 text-right">Total</th>
                    <th className="px-3 py-2 text-right">% Change</th>
                  </tr>
                </thead>
                <tbody>
                  {rawData.map((row, index) => {
                    const change = ((row[2024] - row[2015]) / row[2015] * 100);
                    return (
                      <tr key={row.age} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-3 py-2 font-medium">{row.age}</td>
                        {years.map((year) => (
                          <td key={year} className="px-3 py-2 text-right">{row[year].toLocaleString()}</td>
                        ))}
                        <td className="px-3 py-2 text-right font-medium">{row.total.toLocaleString()}</td>
                        <td className={`px-3 py-2 text-right font-medium ${change > 50 ? 'text-red-600' : change > 20 ? 'text-orange-600' : change > 0 ? 'text-yellow-600' : 'text-green-600'}`}>
                          {change.toFixed(1)}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-2xl font-bold text-blue-600">
              {rawData.reduce((sum, age) => sum + age.total, 0).toLocaleString()}
            </div>
            <div className="text-gray-600">Total Calls, 2015 to 2024</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-2xl font-bold text-red-600">
              {trendAnalysis.filter(t => t.percentChange > 50).length}
            </div>
            <div className="text-gray-600">Ages with greater than 50 percent increase</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-2xl font-bold text-green-600">
              {Math.max(...yearlyData.map(y => y.total)).toLocaleString()}
            </div>
            <div className="text-gray-600">Peak Year Total, 2021</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-2xl font-bold text-purple-600">
              {trendAnalysis.find(t => t.total === Math.max(...trendAnalysis.map(x => x.total)))?.age}
            </div>
            <div className="text-gray-600">Highest Volume Age</div>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Research Implications</h3>
          <div className="text-blue-800 space-y-2">
            <p><strong>Critical Findings:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>The most concerning trend is the increase in younger children, ages 10 to 12</li>
              <li>Peak call volumes occur in mid-teens, ages 14 to 16</li>
              <li>The 2021 spike likely reflects pandemic related mental health impacts</li>
              <li>Early intervention programs should particularly focus on the 10 to 12 age group</li>
            </ul>
            
            <p className="mt-4"><strong>Statistical Considerations:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Small baseline numbers in younger ages may amplify percentage changes</li>
              <li>Consider population adjusted rates for more accurate trend analysis</li>
              <li>Seasonal patterns and reporting changes should be evaluated</li>
              <li>Control for potential confounding factors, such as policy changes and awareness campaigns</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuicideTrendsDashboard;
