<template>
    <div class="candidate-table">
      <table class="min-w-full table-auto border-collapse border border-gray-200 mt-4">
        <thead class="bg-gray-100">
          <tr>
            <th
              v-for="header in headers"
              :key="header.value"
              @click="requestSort(header.value)"
              role="button"
              :aria-label="`Sort by ${header.text}`"
              :aria-sort="getAriaSort(header.value)"
              class="sort-header"
            >
              {{ header.text }}
              <span v-if="sortOptions.currentSort === header.value">
                {{ sortOptions.currentSortDir === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="candidate in candidates" :key="candidate.name" class="hover:bg-gray-50">
            <td class="border border-gray-300 p-2">{{ candidate.name }}</td>
            <td class="border border-gray-300 p-2">{{ candidate.scoreBreakdown.teasScoreGreaterThan62 }}</td>
            <td class="border border-gray-300 p-2">{{ candidate.scoreBreakdown.nonScienceGPAGreaterThan2_5 }}</td>
            <td class="border border-gray-300 p-2">{{ candidate.scoreBreakdown.scienceGPAGreaterThan3_0 }}</td>
            <td class="border border-gray-300 p-2">{{ candidate.scoreBreakdown.hasAllPreReqs }}</td>
            <td class="border border-gray-300 p-2">{{ candidate.scoreBreakdown.hasAaAs }}</td>
            <td class="border border-gray-300 p-2">{{ candidate.totalScore }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CandidateTable',
    props: {
      candidates: Array,
      sortOptions: {
        type: Object,
        default: () => ({
          currentSort: '',
          currentSortDir: ''
        }),
      },
    },
    data() {
      return {
        headers: [
          { text: 'Student Name', value: 'name' },
          { text: 'TEAS Score', value: 'teasScoreGreaterThan62' },
          { text: 'Non-Science GPA', value: 'nonScienceGPAGreaterThan2_5' },
          { text: 'Science GPA', value: 'scienceGPAGreaterThan3_0' },
          { text: 'Has all Pre-Reqs?', value: 'hasAllPreReqs' },
          { text: 'Has AA/AS?', value: 'hasAaAs' },
          { text: 'Total Score', value: 'totalScore' },
        ],
      };
    },
    methods: {
      requestSort(sortKey) {
        let sortDir = 'asc';
        if (this.sortOptions.currentSort === sortKey) {
          sortDir = this.sortOptions.currentSortDir === 'asc' ? 'desc' : 'asc';
        }
        this.$emit('sort', { sortKey, sortDir });
      },
      getAriaSort(column) {
        if (this.sortOptions.currentSort === column) {
          return this.sortOptions.currentSortDir === 'asc' ? 'ascending' : 'descending';
        }
        return 'none';
      },
    },
  };
  </script>
  
  <style scoped>
  .sort-header {
    cursor: pointer;
    white-space: nowrap;
  }
  
  .sort-header span {
    margin-left: 0.5rem;
  }
  </style>
  