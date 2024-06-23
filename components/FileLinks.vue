<template>
  <div>
    <h1>案例文件测试</h1>
    <div v-if="records.length > 0">
      <ul>
        <li v-for="record in records" :key="record.id">
          <h2>{{ record.studentName }} ({{ record.studentNameEn }})</h2>
          <p>{{ record.major }} - {{ record.majorEn }}</p>
          <p>{{ record.offerCompany }} - {{ record.offerCompanyEn }}</p>
          <p>{{ record.post }} - {{ record.postEn }}</p>
          <p>{{ record.companyIntroduction }}</p>
        </li>
      </ul>
    </div>
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'FileLinks',
  setup() {
    const records = ref([]);
    const backendUrl = 'https://seeu-applets.seeu-edu.com/seeuapp/example/listPage';

    onMounted(() => {
      uni.request({
        url: `${backendUrl}?pageNum=1&pageSize=10`,
        method: 'POST',
        data: {
          studentName: '', 
          major: '',
          offerCompany: '',
          post: '',
          businessType: '',
          industryType: ''
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: (response) => {
          if (response.statusCode === 200 && response.data.code === 200) {
            records.value = response.data.data.records;
          } else {
            console.error('Error fetching records:', response);
          }
        },
        fail: (error) => {
          console.error('Request failed:', error);
        }
      });
    });

    return {
      records
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