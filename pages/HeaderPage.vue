<template>
  <nav class="navbar bg-body-tertiary">
    <div class="sticky-header container-fluid d-flex align-items-center" style="gap: 20px;">
      <a class="navbar-brand" href="#" @click.prevent="navigateTo('home')">
        <img src="https://asset.idefix.com/images/app-icons/logo.svg" alt="Logo" width="80" height="70" class="d-inline-block align-text-top">
      </a>

      <div class="d-flex justify-content-center align-items-center flex-grow-1 mx-3">
        <div style="position: relative; width: 70%;">
          <input 
            type="text" 
            class="form-control" 
            placeholder="Ürün, kategori veya marka ara" 
            style="width: 100%; padding-right: 40px; height: 45px; background-color: #f0f0f0; border: 1px solid #ccc; border-radius: 4px;" />
          <i class="bi bi-search" 
            style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); font-size: 20px; color: #333;"></i>
        </div>
      </div>

      <div class="d-flex align-items-center" style="margin-left: 30px;">
        <a href="#" class="login-text" style="font-size: 12px; color: black; text-align: center; margin-right: 15px; text-decoration: none;">
          <span class="register-text" style="font-size: 14px; font-weight: bold; color: black;" @click.prevent="navigateTo('login')">Giriş Yap</span>
          <br> <span @click.prevent="navigateTo('signin')"> veya Üye Ol</span>
        </a>
   
        <i class="bi bi-person" style="font-size: 25px; margin-right: 15px;" @click="navigateTo('login')"></i>
        <i class="bi bi-heart" style="font-size: 25px; margin-right: 15px;" @click="navigateTo('favorites')"></i>
        <i class="bi bi-bag" style="font-size: 25px; margin-right: 25px;" @click="navigateTo('cart')"></i>
      </div>
    </div>

    <div class="col-1"></div>
    <div class="col-10">  
      <div class="categories-row">
        <div v-for="category in categories" :key="category.id" class="category-item">
          <a href="#" class="category-link">{{ category.name }}</a>
        </div>
      </div>
    </div>
    <div class="col-1"></div>
  </nav>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useNuxtApp } from '#app';
import { getDocs, collection, query, orderBy } from 'firebase/firestore';

export default {
  name: "HeaderPage",
  setup() {
    const categories = ref([]);
    const { $db } = useNuxtApp();
    const router = useRouter();

    const fetchCategories = async () => {
      try {
        const categoriesRef = collection($db, "categories");
        const q = query(categoriesRef, orderBy("order", "asc"));
        const querySnapshot = await getDocs(q);
        categories.value = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        console.error("Kategoriler alınırken hata oluştu:", error);
      }
    };

    const navigateTo = (page) => {
      const routes = {
        home: "/",
        login: "/GirisyapPage",
        favorites: "/BegendiklerimPage",
        cart: "/SepetPage",
        signin: "/UyeolPage",
      };
      router.push(routes[page]);
    };

    onMounted(fetchCategories);

    return {
      categories,
      navigateTo,
    };
  },
};
</script>

<style scoped>
.navbar {
  background-color: white !important;
  border-bottom: 1px solid #ddd;
  padding: 10px 20px;
}
.sticky-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: white;
  padding: 10px 20px;
}

/* Search Bar */
.search-input {
  width: 100%;
  padding-right: 40px;
  height: 45px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  color: #333;
}

/* User Actions */
.user-actions {
  margin-left: 30px;
}

.login-text {
  font-size: 12px;
  color: black;
  text-align: center;
  margin-right: 15px;
}

.register-text {
  font-size: 14px;
  font-weight: bold;
  color: black;
}

.action-icon {
  font-size: 25px;
  margin-right: 15px;
  cursor: pointer;
}

/* Categories */
.categories-row {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  gap: 10px;
  overflow: hidden;
}

.category-item {
  display: inline-block;
}

.category-link {
  text-decoration: none;
  color: #000;
  font-size: 14px;
  display: block;
  padding: 10px 10px;
}

.category-link:hover {
  text-decoration: underline;
}
</style>
