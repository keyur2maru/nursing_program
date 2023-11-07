<template>
  <div :class="{ 'dark-mode': isDarkMode, 'app': true }">
    <!-- Title -->
    <div class="title-container">
      <h1 class="title">Nursing Program Results</h1>
    </div>

    <!-- Content -->
    <div class="container">
      <!-- Tab buttons and Theme Toggle -->
      <div class="tab-buttons">
        <button
          v-for="tab in tabs"
          :key="tab"
          :class="{'active': activeTab === tab}"
          @click="setActiveTab(tab)"
        >{{ tab }} Candidates</button>
        <button class="toggle-theme" @click="toggleDarkMode">🌓 Toggle Dark/Light Mode</button>
      </div>

      <!-- Search bar -->
      <div class="search-bar">
        <input v-model="searchQuery" type="text" placeholder="Search by name..." />
      </div>

      <!-- Pagination controls -->
      <div class="pagination-controls">
        <button 
          v-if="currentPageSet > 0" 
          @click="changePageSet(-1)"
        >«</button>
        <button 
          v-if="currentPage > 1" 
          @click="changePage(currentPage - 1)"
        >‹</button>
        <button
          v-for="page in visiblePages"
          :key="page"
          :class="{ 'active': currentPage === page }"
          @click="changePage(page)"
        >{{ page }}</button>

        <!-- Only show this button if the next page is available -->
        <button 
          @click="changePage(currentPage + 1)" 
          :disabled="currentPage === totalPages"
          v-if="currentPage < totalPages"
        >›</button>

        <!-- Only show this button if the next set of pages is available -->
        <button 
          @click="changePageSet(1)" 
          :disabled="currentPageSet >= pageSetLimit"
          v-if="currentPageSet < pageSetLimit"
        >»</button>
      </div>

      <!-- Candidates list based on active tab -->
      <div class="candidates">
        <CandidateTable
          :candidates="paginatedCandidates"
          :sortOptions="{ currentSort, currentSortDir }"
          @sort="handleSort"
        />
      </div>
      <!-- Pagination controls -->
      <div class="pagination-controls">
        <button @click="changePageSet(-1)" :disabled="currentPageSet === 0">«</button>
        <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">‹</button>
        <button
          v-for="page in visiblePages"
          :key="page"
          :class="{ 'active': currentPage === page }"
          @click="changePage(page)"
        >{{ page }}</button>

        <!-- Only show this button if the next page is available -->
        <button 
          @click="changePage(currentPage + 1)" 
          :disabled="currentPage === totalPages"
          v-if="currentPage < totalPages"
        >›</button>

        <!-- Only show this button if the next set of pages is available -->
        <button 
          @click="changePageSet(1)" 
          :disabled="currentPageSet >= pageSetLimit"
          v-if="currentPageSet < pageSetLimit"
        >»</button>
      </div>
    </div>
  </div>
  <canvas id="confetti-canvas"></canvas>
</template>

<script>
import CandidateTable from './CandidateTable.vue';
import sortUtil from './sortUtil';
import confetti from 'canvas-confetti';

export default {
  name: 'App',
  components: {
    CandidateTable,
  },
  data() {
    return {
      approvedCandidates: [],
      notApprovedCandidates: [],
      searchQuery: '',
      pageSize: 20,
      currentPage: 1,
      currentPageSet: 0,
      pageSetSize: 10,
      activeTab: 'Selected',
      currentSort: 'name',
      currentSortDir: 'asc',
      isDarkMode: false,
      tabs: ['Selected', 'Rejected'],
    };
  },
  computed: {
    pageSetLimit() {
      return Math.ceil(this.totalPages / this.pageSetSize) - 1;
      },
      visiblePages() {
      let pages = [];
      let startPage = this.currentPageSet * this.pageSetSize + 1;
      let endPage = startPage + this.pageSetSize - 1;

      // Adjust the range if it goes beyond the total pages
      if (endPage > this.totalPages) {
        endPage = this.totalPages;
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      return pages;
    },
    paginatedCandidates() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.sortedCandidates.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.sortedCandidates.length / this.pageSize);
    },
    sortedCandidates() {
      return this.sortCandidates(
        this.activeTab === 'Selected'
          ? this.filteredApprovedCandidates
          : this.filteredRejectedCandidates
      );
    },
    filteredApprovedCandidates() {
      return this.filterCandidates(this.approvedCandidates);
    },
    filteredRejectedCandidates() {
      return this.filterCandidates(this.notApprovedCandidates);
    },
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
      this.currentPage = 1; // Reset page to 1 when tab changes
      this.currentPageSet = 0; // Also reset the current page set
    },
    changePage(page) {
      this.currentPage = page;
      // Automatically update the page set when the page changes
      let newSet = Math.floor((this.currentPage - 1) / this.pageSetSize);
      if (newSet !== this.currentPageSet) {
        this.currentPageSet = newSet;
      }
    },
    changePageSet(direction) {
      // Calculate the new page set
      this.currentPageSet += direction;
      
      // Update the current page to the first page of the new set
      if (direction === 1) {
        this.changePage(this.currentPageSet * this.pageSetSize + 1);
      } else {
        this.changePage((this.currentPageSet + 1) * this.pageSetSize);
      }
    },
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
    },
    filterCandidates(candidates) {
      return candidates.filter(candidate =>
        candidate.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    handleSort({ sortKey, sortDir }) {
      this.currentSort = sortKey;
      this.currentSortDir = sortDir;
    },
    sortCandidates(candidates) {
      // The sorting logic can be imported from an external utility file
      return sortUtil.sortCandidates(candidates, this.currentSort, this.currentSortDir);
    },
    launchConfetti() {
      const canvas = document.getElementById('confetti-canvas');
      const myConfetti = confetti.create(canvas, { resize: true });
      myConfetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    },
  },
  mounted() {
    Promise.all([
      import('./assets/selected.json'),
      import('./assets/rejected.json')
    ]).then(([selectedModule, rejectedModule]) => {
      this.approvedCandidates = selectedModule.selectedCandidates;
      this.notApprovedCandidates = rejectedModule.rejectedCandidates;
      this.launchConfetti();
    }).catch(error => {
      console.error('Error loading candidate data:', error);
    });
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#confetti-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  }
  
.app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: #333;
  background-color: #f4f4f9;
  transition: background-color 0.3s, color 0.3s;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.tab-buttons button {
  background-color: transparent;
  border: none;
  padding: 1rem 2rem;
  margin-right: 1rem;
  font-size: 1rem;
  border-radius: 50px;
  transition: background-color 0.3s;
}

.tab-buttons button.active {
  background-color: #007aff;
  color: white;
}

.search-bar {
  margin: 2rem 0;
}

.search-bar input {
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 50px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.candidates {
  background-color: white;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 2rem;
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 1rem;
}

th, td {
  text-align: left;
  padding: 1rem;
  border-bottom: 1px solid #eaeaea;
}

th:first-child, td:first-child {
  border-top-left-radius: 20px;
}

th:last-child, td:last-child {
  border-top-right-radius: 20px;
}

thead {
  background-color: #fafafa;
}

tbody tr:hover {
  background-color: #f0f0f0;
}

/* Dark Mode */
.dark-mode {
  background-color: #1c1c1e;
  color: #f4f4f9;
}

.dark-mode .candidates {
  background-color: #2c2c2e;
}

.dark-mode .search-bar input {
  background-color: #3a3a3c;
  color: #f4f4f9;
}

.dark-mode table {
  border: 1px solid #444;
}

.dark-mode th, .dark-mode td {
  border-bottom: 1px solid #444;
}

.dark-mode thead {
  background-color: #3a3a3c;
}

.dark-mode tbody tr:hover {
  background-color: #48484a;
}

.dark-mode, .dark-mode thead, .dark-mode tbody tr {
  color: #ffffff; /* Ensure text is white in dark mode */
}

/* Apply a different background color for the active tab in dark mode */
.dark-mode .tab-buttons button.active {
  background-color: #005ecb; /* Darker shade of blue for better visibility in dark mode */
}

/* Ensure that non-active tabs also have visible text in dark mode */
.dark-mode .tab-buttons button {
  color: #ffffff; /* White text for non-active buttons */
}

.tab-buttons .toggle-theme {
  float: right; /* Aligns the button to the right */
  margin-right: 0; /* Removes the margin from the right side */
  padding: 0.8rem 1.6rem; /* Smaller padding to reduce size */
  font-size: 0.9rem; /* Smaller font size */
  border-radius: 50px; /* Keeps consistency with the border-radius */
  transition: background-color 0.3s; /* Smooth transition for theme change */
  cursor: pointer; /* Changes the cursor to signify this is a clickable button */
}

.title-container {
  text-align: center; /* Centers the title */
  margin-top: 0; /* Adds space at the top */
  margin-bottom: 2rem; /* Adds space at the bottom */
}

.app {
  margin-top: 0; /* Remove if there's any top margin */
  /* Other styles */
}

.title {
  font-size: 2.5rem; /* Large font size for the title */
  color: #333; /* Dark color for the text */
  font-weight: bold; /* Makes the font bold */
  text-transform: uppercase; /* Optional: Capitalizes all letters */
  letter-spacing: 2px; /* Optional: Increases spacing between letters for style */
}

/* Style for the title in dark mode */
.dark-mode .title {
  color: #f4f4f9; /* Light color for the text in dark mode */
}

.pagination-controls {
  display: flex;
  justify-content: center;
  padding: 1rem;
}

.pagination-controls button {
  background-color: transparent;
  border: 1px solid #007aff;
  color: #007aff;
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.pagination-controls button.active {
  background-color: #007aff;
  color: white;
}

.pagination-controls button:hover:not(.active) {
  background-color: #e7f0fd;
}

@media (max-width: 768px) {
  * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  }

  .title-container {
    text-align: center; /* Centers the title */
    margin-top: 0; /* Adds space at the top */
    padding-top: 3rem; /* Adds space at the top */
    padding-bottom: 0; /* Adds space at the bottom */
    margin-bottom: 0; /* Adds space at the bottom */
  }

  /* Title Styling */
  .title {
    font-size: 1.3rem; /* Decrease the font size */
    text-align: center; /* Center the title */
  }

  /* Tab Button Styling */
  .tab-buttons {
    display: flex; /* Display the buttons in a row */
    flex-wrap: wrap; /* Allow the buttons to wrap to the next line */
    justify-content: center; /* Center the buttons */
  }

  .tab-buttons button {
    margin: 0.5rem; /* Add margin to each button */
  }

  /* Search Bar Styling */
  .search-bar {
    margin: 1rem 0; /* Add margin to the search bar */
  }

  /* Pagination Controls Styling */
  .pagination-controls {
    flex-wrap: wrap; /* Allow the buttons to wrap to the next line */
  }

  .pagination-controls button {
    margin: 0.5rem 0; /* Add margin to each button */
  }

  /* Candidate Table Styling */
  .candidates {
    overflow-x: auto; /* Allow horizontal scrolling */
  }

  table {
    width: 1000px; /* Set a fixed width for the table */
  }

  th, td {
    font-size: 0.9rem; /* Decrease the font size for each cell */
  }

  th:first-child, td:first-child {
    min-width: 200px; /* Set a larger minimum width for the first cell */
  }

  th:last-child, td:last-child {
    min-width: 150px; /* Set a smaller minimum width for the last cell */
  }

  /* Dark Mode Styling */
  .dark-mode .tab-buttons button {
    margin: 0.5rem; /* Add margin to each button */
  }

  .dark-mode .pagination-controls button {
    margin: 0.5rem 0; /* Add margin to each button */
  }

  .dark-mode table {
    width: 100%; /* Set the table width to 100% */
  }

  .dark-mode th, .dark-mode td {
    min-width: 0; /* Remove the minimum width */
  }

  .dark-mode th:first-child, .dark-mode td:first-child {
    min-width: 0; /* Remove the minimum width */
  }

  .dark-mode th:last-child, .dark-mode td:last-child {
    min-width: 0; /* Remove the minimum width */
  }

  .dark-mode .pagination-controls {
    flex-wrap: wrap; /* Allow the buttons to wrap to the next line */
    justify-content: center; /* Center the buttons */
  }

  .dark-mode .pagination-controls button {
    margin: 0 0.5rem; /* Add margin to each button */
  }

  .dark-mode .candidates {
    overflow-x: auto; /* Allow horizontal scrolling */
  }

  .dark-mode table {
    width: 1000px; /* Set a fixed width for the table */
  }

  .dark-mode th, .dark-mode td {
    min-width: 100px; /* Set a minimum width for each cell */
  }

  .dark-mode th:first-child, .dark-mode td:first-child {
    min-width: 200px; /* Set a larger minimum width for the first cell */
  }

  .dark-mode th:last-child, .dark-mode td:last-child {
    min-width: 150px; /* Set a smaller minimum width for the last cell */
  }

  /* Other styles */
}
</style>
