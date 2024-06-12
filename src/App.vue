<template>
  <div>
    <h1>案例文件测试</h1>
    <div v-if="fileLinks">
      <img :src="backendUrl + fileLinks.imageLink" alt="Image" />
      <br />
      <button @click="viewExcelFile">查看案例文件</button>
    </div>
    <div v-else>
      Loading...
    </div>
    <div v-if="excelContent">
      <h2>Excel Content</h2>
      <table>
        <thead>
          <tr>
            <th v-for="header in excelContent.headers" :key="header">{{ header }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in excelContent.rows" :key="rowIndex">
            <td v-for="cell in row" :key="cell">{{ cell }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import XLSX from 'xlsx';

export default {
  name: 'FileLinks',
  setup() {
    const fileLinks = ref(null);
    const excelContent = ref(null);
    const backendUrl = 'http://localhost:8080'; // Base URL for your Spring Boot backend

    onMounted(() => {
      axios.get(`${backendUrl}/api/files`)
        .then(response => {
          fileLinks.value = response.data;
        })
        .catch(error => {
          console.error('Error fetching file links:', error);
        });
    });

    const viewExcelFile = () => {
      axios.get(`${backendUrl}${fileLinks.value.excelLink}`, {
        responseType: 'arraybuffer'
      }).then(response => {
        const data = new Uint8Array(response.data);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonSheet = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Parse headers and rows
        const headers = jsonSheet[0];
        const rows = jsonSheet.slice(1);

        excelContent.value = { headers, rows };
      }).catch(error => {
        console.error('Error fetching or parsing Excel file:', error);
      });
    };

    return {
      fileLinks,
      excelContent,
      backendUrl,
      viewExcelFile
    };
  }
};
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
