<template>
  <div class="d-flex flex-column ml-7 mt-4 mb-7 mr-12">
    <div class="d-flex flex-row justify-space-between mb-12">
      <v-btn
        @click="handleBack"
        depressed
        color="header"
        class="rounded-lg mr-4 outlined-custom"
      >
        <p class="header-button-back ma-0">
          <v-icon class="mr-1" small>mdi-chevron-left</v-icon>
          <span> Kembali </span>
        </p>
      </v-btn>
    </div>
    <div class="d-flex flex-row justify-space-between mb-6 mt-1">
      <div class="d-flex flex-column" style="width: 100vw">
        <div class="d-flex flex-row justify-space-between">
          <p class="header-title mb-4">
            Input Tabel Kompetensi {{ isAlumni ? "Alumni" : "Siswa" }}
          </p>
        </div>
        <div class="d-flex flex-column pr-12 mr-12">
          <p class="header-subtitle">
            {{ getKompetensi.nama_siswa || "-" | toTitle }} -
            {{ getKompetensi.nama_kelas || "-" | upperCase }}
          </p>
          <div class="d-flex flex-row">
            <div class="backgroundLabel mr-4">
              <p class="header-subtitle py-2 px-3 ma-0">
                NIS : {{ getKompetensi.NIS || "-" | toTitle }}
              </p>
            </div>
            <div class="backgroundLabel mr-4">
              <p class="header-subtitle py-2 px-3 ma-0">
                NISN : {{ getKompetensi.NISN || "-" | toTitle }}
              </p>
            </div>
            <div class="backgroundLabel mr-4">
              <p class="header-subtitle py-2 px-3 ma-0">
                Semester : {{ semester || "-" }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ContentNotFound
      message="Data Tabel Kompetensi Siswa Not Found"
      :loading="loading"
      v-if="!isAvailable && isUpdate"
    >
      <template v-slot:action>
        <v-btn
          @click="() => getDetail()"
          depressed
          color="header"
          class="rounded-lg outlined-custom"
        >
          <v-icon class="mr-1" small>mdi-reload</v-icon>
          <p class="header-button-back ma-0">Reload</p>
        </v-btn>
      </template>
    </ContentNotFound>
    <template v-else>
      <div class="table-border mb-6 rounded-lg pa-4">
        <p class="mb-6 kelompok-label">Kelompok A (Wajib)</p>
        <div class="kelompok-item rounded pa-4" style="width: 100%">
          <p class="kelompok-sublabel mb-4">Pendidikan Agama Islam</p>
          <div class="d-flex flex-row justify-space-between">
            <div style="width: 50%" class="mr-4">
              <p class="mb-1 input-custom-label">Nilai</p>
              <v-text-field
                v-model="items.kelompokA[0].nilai"
                label="0"
                solo
                hide-details
              />
            </div>
            <div style="width: 50%">
              <p class="mb-1 input-custom-label">Sikap</p>
              <v-select
                :items="listSikap"
                v-model="items.kelompokA[0].sikap"
                label="Pilihan Sikap"
                solo
                hide-details
              />
            </div>
          </div>
        </div>
        <v-divider class="my-4" />
        <div class="kelompok-item rounded pa-4" style="width: 100%">
          <p class="kelompok-sublabel mb-4">PPKN</p>
          <div class="d-flex flex-row justify-space-between">
            <div style="width: 50%" class="mr-4">
              <p class="mb-1 input-custom-label">Nilai</p>
              <v-text-field
                v-model="items.kelompokA[1].nilai"
                label="0"
                solo
                hide-details
              />
            </div>
            <div style="width: 50%">
              <p class="mb-1 input-custom-label">Sikap</p>
              <v-select
                v-model="items.kelompokA[1].sikap"
                :items="listSikap"
                label="Pilihan Sikap"
                solo
                hide-details
              />
            </div>
          </div>
        </div>
        <v-divider class="my-4" />
        <div class="kelompok-item rounded pa-4" style="width: 100%">
          <p class="kelompok-sublabel mb-4">Bahasa Indonesia</p>
          <div class="d-flex flex-row justify-space-between">
            <div style="width: 50%" class="mr-4">
              <p class="mb-1 input-custom-label">Nilai</p>
              <v-text-field
                v-model="items.kelompokA[2].nilai"
                label="0"
                solo
                hide-details
              />
            </div>
            <div style="width: 50%">
              <p class="mb-1 input-custom-label">Sikap</p>
              <v-select
                v-model="items.kelompokA[2].sikap"
                :items="listSikap"
                label="Pilihan Sikap"
                solo
                hide-details
              />
            </div>
          </div>
        </div>
        <v-divider class="my-4" />
        <div class="kelompok-item rounded pa-4" style="width: 100%">
          <p class="kelompok-sublabel mb-4">Matematika</p>
          <div class="d-flex flex-row justify-space-between">
            <div style="width: 50%" class="mr-4">
              <p class="mb-1 input-custom-label">Nilai</p>
              <v-text-field
                v-model="items.kelompokA[3].nilai"
                label="0"
                solo
                hide-details
              />
            </div>
            <div style="width: 50%">
              <p class="mb-1 input-custom-label">Sikap</p>
              <v-select
                v-model="items.kelompokA[3].sikap"
                :items="listSikap"
                label="Pilihan Sikap"
                solo
                hide-details
              />
            </div>
          </div>
        </div>
        <v-divider class="my-4" />
        <div class="kelompok-item rounded pa-4" style="width: 100%">
          <p class="kelompok-sublabel mb-4">Sejarah Indonesia</p>
          <div class="d-flex flex-row justify-space-between">
            <div style="width: 50%" class="mr-4">
              <p class="mb-1 input-custom-label">Nilai</p>
              <v-text-field
                v-model="items.kelompokA[4].nilai"
                label="0"
                solo
                hide-details
              />
            </div>
            <div style="width: 50%">
              <p class="mb-1 input-custom-label">Sikap</p>
              <v-select
                v-model="items.kelompokA[4].sikap"
                :items="listSikap"
                label="Pilihan Sikap"
                solo
                hide-details
              />
            </div>
          </div>
        </div>
        <v-divider class="my-4" />
        <div class="kelompok-item rounded pa-4" style="width: 100%">
          <p class="kelompok-sublabel mb-4">Bahasa Inggris</p>
          <div class="d-flex flex-row justify-space-between">
            <div style="width: 50%" class="mr-4">
              <p class="mb-1 input-custom-label">Nilai</p>
              <v-text-field
                v-model="items.kelompokA[5].nilai"
                label="0"
                solo
                hide-details
              />
            </div>
            <div style="width: 50%">
              <p class="mb-1 input-custom-label">Sikap</p>
              <v-select
                v-model="items.kelompokA[5].sikap"
                :items="listSikap"
                label="Pilihan Sikap"
                solo
                hide-details
              />
            </div>
          </div>
        </div>
      </div>
      <div class="table-border mb-6 rounded-lg pa-4">
        <p class="mb-6 kelompok-label">Kelompok B (Wajib)</p>
        <div class="kelompok-item rounded pa-4" style="width: 100%">
          <p class="kelompok-sublabel mb-4">Seni Budaya</p>
          <div class="d-flex flex-row justify-space-between">
            <div style="width: 50%" class="mr-4">
              <p class="mb-1 input-custom-label">Nilai</p>
              <v-text-field
                v-model="items.kelompokB[0].nilai"
                label="0"
                solo
                hide-details
              />
            </div>
            <div style="width: 50%">
              <p class="mb-1 input-custom-label">Sikap</p>
              <v-select
                v-model="items.kelompokB[0].sikap"
                :items="listSikap"
                label="Pilihan Sikap"
                solo
                hide-details
              />
            </div>
          </div>
        </div>
        <v-divider class="my-4" />
        <div class="kelompok-item rounded pa-4" style="width: 100%">
          <p class="kelompok-sublabel mb-4">Penjas, Olahraga & Kesehatan</p>
          <div class="d-flex flex-row justify-space-between">
            <div style="width: 50%" class="mr-4">
              <p class="mb-1 input-custom-label">Nilai</p>
              <v-text-field
                v-model="items.kelompokB[1].nilai"
                label="0"
                solo
                hide-details
              />
            </div>
            <div style="width: 50%">
              <p class="mb-1 input-custom-label">Sikap</p>
              <v-select
                v-model="items.kelompokB[1].sikap"
                :items="listSikap"
                label="Pilihan Sikap"
                solo
                hide-details
              />
            </div>
          </div>
        </div>
        <v-divider class="my-4" />
        <div class="kelompok-item rounded pa-4" style="width: 100%">
          <p class="kelompok-sublabel mb-4">Prakarya & Kewirausahaan</p>
          <div class="d-flex flex-row justify-space-between">
            <div style="width: 50%" class="mr-4">
              <p class="mb-1 input-custom-label">Nilai</p>
              <v-text-field
                v-model="items.kelompokB[2].nilai"
                label="0"
                solo
                hide-details
              />
            </div>
            <div style="width: 50%">
              <p class="mb-1 input-custom-label">Sikap</p>
              <v-select
                v-model="items.kelompokB[2].sikap"
                :items="listSikap"
                label="Pilihan Sikap"
                solo
                hide-details
              />
            </div>
          </div>
        </div>
      </div>
      <div class="table-border mb-6 rounded-lg pa-4">
        <p class="mb-6 kelompok-label">Kelompok C Peminatan</p>
        <div class="kelompok-item rounded pa-4" style="width: 100%">
          <p class="kelompok-sublabel mb-4">Matematika</p>
          <div class="d-flex flex-row justify-space-between">
            <div style="width: 50%" class="mr-4">
              <p class="mb-1 input-custom-label">Nilai</p>
              <v-text-field
                v-model="items.kelompokC[0].nilai"
                label="0"
                solo
                hide-details
              />
            </div>
            <div style="width: 50%">
              <p class="mb-1 input-custom-label">Sikap</p>
              <v-select
                v-model="items.kelompokC[0].sikap"
                :items="listSikap"
                label="Pilihan Sikap"
                solo
                hide-details
              />
            </div>
          </div>
        </div>
        <v-divider class="my-4" />
        <div class="kelompok-item rounded pa-4" style="width: 100%">
          <p class="kelompok-sublabel mb-4">Biologi</p>
          <div class="d-flex flex-row justify-space-between">
            <div style="width: 50%" class="mr-4">
              <p class="mb-1 input-custom-label">Nilai</p>
              <v-text-field
                v-model="items.kelompokC[1].nilai"
                label="0"
                solo
                hide-details
              />
            </div>
            <div style="width: 50%">
              <p class="mb-1 input-custom-label">Sikap</p>
              <v-select
                v-model="items.kelompokC[1].sikap"
                :items="listSikap"
                label="Pilihan Sikap"
                solo
                hide-details
              />
            </div>
          </div>
        </div>
        <v-divider class="my-4" />
        <div class="kelompok-item rounded pa-4" style="width: 100%">
          <p class="kelompok-sublabel mb-4">Fisika</p>
          <div class="d-flex flex-row justify-space-between">
            <div style="width: 50%" class="mr-4">
              <p class="mb-1 input-custom-label">Nilai</p>
              <v-text-field
                v-model="items.kelompokC[2].nilai"
                label="0"
                solo
                hide-details
              />
            </div>
            <div style="width: 50%">
              <p class="mb-1 input-custom-label">Sikap</p>
              <v-select
                v-model="items.kelompokC[2].sikap"
                :items="listSikap"
                label="Pilihan Sikap"
                solo
                hide-details
              />
            </div>
          </div>
        </div>
        <v-divider class="my-4" />
        <div class="kelompok-item rounded pa-4" style="width: 100%">
          <p class="kelompok-sublabel mb-4">Kimia</p>
          <div class="d-flex flex-row justify-space-between">
            <div style="width: 50%" class="mr-4">
              <p class="mb-1 input-custom-label">Nilai</p>
              <v-text-field
                v-model="items.kelompokC[3].nilai"
                label="0"
                solo
                hide-details
              />
            </div>
            <div style="width: 50%">
              <p class="mb-1 input-custom-label">Sikap</p>
              <v-select
                v-model="items.kelompokC[3].sikap"
                :items="listSikap"
                label="Pilihan Sikap"
                solo
                hide-details
              />
            </div>
          </div>
        </div>
        <v-divider class="my-4" />
        <div class="kelompok-item rounded pa-4" style="width: 100%">
          <p class="kelompok-sublabel mb-4">Geografi</p>
          <div class="d-flex flex-row justify-space-between">
            <div style="width: 50%" class="mr-4">
              <p class="mb-1 input-custom-label">Nilai</p>
              <v-text-field
                v-model="items.kelompokC[4].nilai"
                label="0"
                solo
                hide-details
              />
            </div>
            <div style="width: 50%">
              <p class="mb-1 input-custom-label">Sikap</p>
              <v-select
                v-model="items.kelompokC[4].sikap"
                :items="listSikap"
                label="Pilihan Sikap"
                solo
                hide-details
              />
            </div>
          </div>
        </div>
        <v-divider class="my-4" />
        <div class="kelompok-item rounded pa-4" style="width: 100%">
          <p class="kelompok-sublabel mb-4">Sejarah</p>
          <div class="d-flex flex-row justify-space-between">
            <div style="width: 50%" class="mr-4">
              <p class="mb-1 input-custom-label">Nilai</p>
              <v-text-field
                v-model="items.kelompokC[5].nilai"
                label="0"
                solo
                hide-details
              />
            </div>
            <div style="width: 50%">
              <p class="mb-1 input-custom-label">Sikap</p>
              <v-select
                v-model="items.kelompokC[5].sikap"
                :items="listSikap"
                label="Pilihan Sikap"
                solo
                hide-details
              />
            </div>
          </div>
        </div>
        <v-divider class="my-4" />
        <div class="kelompok-item rounded pa-4" style="width: 100%">
          <p class="kelompok-sublabel mb-4">Sosiologi</p>
          <div class="d-flex flex-row justify-space-between">
            <div style="width: 50%" class="mr-4">
              <p class="mb-1 input-custom-label">Nilai</p>
              <v-text-field
                v-model="items.kelompokC[6].nilai"
                label="0"
                solo
                hide-details
              />
            </div>
            <div style="width: 50%">
              <p class="mb-1 input-custom-label">Sikap</p>
              <v-select
                v-model="items.kelompokC[6].sikap"
                :items="listSikap"
                label="Pilihan Sikap"
                solo
                hide-details
              />
            </div>
          </div>
        </div>
        <v-divider class="my-4" />
        <div class="kelompok-item rounded pa-4" style="width: 100%">
          <p class="kelompok-sublabel mb-4">Ekonomi</p>
          <div class="d-flex flex-row justify-space-between">
            <div style="width: 50%" class="mr-4">
              <p class="mb-1 input-custom-label">Nilai</p>
              <v-text-field
                v-model="items.kelompokC[7].nilai"
                label="0"
                solo
                hide-details
              />
            </div>
            <div style="width: 50%">
              <p class="mb-1 input-custom-label">Sikap</p>
              <v-select
                v-model="items.kelompokC[7].sikap"
                :items="listSikap"
                label="Pilihan Sikap"
                solo
                hide-details
              />
            </div>
          </div>
        </div>
        <v-divider class="my-4" />
      </div>
      <div class="table-border mb-6 rounded-lg pa-4">
        <p class="mb-6 kelompok-label">Kelompok C Lintas Peminatan</p>
        <div class="kelompok-item rounded pa-4" style="width: 100%">
          <p class="kelompok-sublabel mb-4">Matematika</p>
          <div class="d-flex flex-row justify-space-between">
            <div style="width: 50%" class="mr-4">
              <p class="mb-1 input-custom-label">Nilai</p>
              <v-text-field
                v-model="items.kelompokCLintas[0].nilai"
                label="0"
                solo
                hide-details
              />
            </div>
            <div style="width: 50%">
              <p class="mb-1 input-custom-label">Sikap</p>
              <v-select
                v-model="items.kelompokCLintas[0].sikap"
                :items="listSikap"
                label="Pilihan Sikap"
                solo
                hide-details
              />
            </div>
          </div>
        </div>
        <v-divider class="my-4" />
        <div class="kelompok-item rounded pa-4" style="width: 100%">
          <p class="kelompok-sublabel mb-4">Biologi</p>
          <div class="d-flex flex-row justify-space-between">
            <div style="width: 50%" class="mr-4">
              <p class="mb-1 input-custom-label">Nilai</p>
              <v-text-field
                v-model="items.kelompokCLintas[1].nilai"
                label="0"
                solo
                hide-details
              />
            </div>
            <div style="width: 50%">
              <p class="mb-1 input-custom-label">Sikap</p>
              <v-select
                v-model="items.kelompokCLintas[1].sikap"
                :items="listSikap"
                label="Pilihan Sikap"
                solo
                hide-details
              />
            </div>
          </div>
        </div>
        <v-divider class="my-4" />
        <div class="kelompok-item rounded pa-4" style="width: 100%">
          <p class="kelompok-sublabel mb-4">Fisika</p>
          <div class="d-flex flex-row justify-space-between">
            <div style="width: 50%" class="mr-4">
              <p class="mb-1 input-custom-label">Nilai</p>
              <v-text-field
                v-model="items.kelompokCLintas[2].nilai"
                label="0"
                solo
                hide-details
              />
            </div>
            <div style="width: 50%">
              <p class="mb-1 input-custom-label">Sikap</p>
              <v-select
                v-model="items.kelompokCLintas[2].sikap"
                :items="listSikap"
                label="Pilihan Sikap"
                solo
                hide-details
              />
            </div>
          </div>
        </div>
        <v-divider class="my-4" />
        <div class="kelompok-item rounded pa-4" style="width: 100%">
          <p class="kelompok-sublabel mb-4">Kimia</p>
          <div class="d-flex flex-row justify-space-between">
            <div style="width: 50%" class="mr-4">
              <p class="mb-1 input-custom-label">Nilai</p>
              <v-text-field
                v-model="items.kelompokCLintas[3].nilai"
                label="0"
                solo
                hide-details
              />
            </div>
            <div style="width: 50%">
              <p class="mb-1 input-custom-label">Sikap</p>
              <v-select
                v-model="items.kelompokCLintas[3].sikap"
                :items="listSikap"
                label="Pilihan Sikap"
                solo
                hide-details
              />
            </div>
          </div>
        </div>
        <v-divider class="my-4" />
        <div class="kelompok-item rounded pa-4" style="width: 100%">
          <p class="kelompok-sublabel mb-4">Geografi</p>
          <div class="d-flex flex-row justify-space-between">
            <div style="width: 50%" class="mr-4">
              <p class="mb-1 input-custom-label">Nilai</p>
              <v-text-field
                v-model="items.kelompokCLintas[4].nilai"
                label="0"
                solo
                hide-details
              />
            </div>
            <div style="width: 50%">
              <p class="mb-1 input-custom-label">Sikap</p>
              <v-select
                v-model="items.kelompokCLintas[4].sikap"
                :items="listSikap"
                label="Pilihan Sikap"
                solo
                hide-details
              />
            </div>
          </div>
        </div>
        <v-divider class="my-4" />
        <div class="kelompok-item rounded pa-4" style="width: 100%">
          <p class="kelompok-sublabel mb-4">Sejarah</p>
          <div class="d-flex flex-row justify-space-between">
            <div style="width: 50%" class="mr-4">
              <p class="mb-1 input-custom-label">Nilai</p>
              <v-text-field
                v-model="items.kelompokCLintas[5].nilai"
                label="0"
                solo
                hide-details
              />
            </div>
            <div style="width: 50%">
              <p class="mb-1 input-custom-label">Sikap</p>
              <v-select
                v-model="items.kelompokCLintas[5].sikap"
                :items="listSikap"
                label="Pilihan Sikap"
                solo
                hide-details
              />
            </div>
          </div>
        </div>
        <v-divider class="my-4" />
        <div class="kelompok-item rounded pa-4" style="width: 100%">
          <p class="kelompok-sublabel mb-4">Sosiologi</p>
          <div class="d-flex flex-row justify-space-between">
            <div style="width: 50%" class="mr-4">
              <p class="mb-1 input-custom-label">Nilai</p>
              <v-text-field
                v-model="items.kelompokCLintas[6].nilai"
                label="0"
                solo
                hide-details
              />
            </div>
            <div style="width: 50%">
              <p class="mb-1 input-custom-label">Sikap</p>
              <v-select
                v-model="items.kelompokCLintas[6].sikap"
                :items="listSikap"
                label="Pilihan Sikap"
                solo
                hide-details
              />
            </div>
          </div>
        </div>
        <v-divider class="my-4" />
        <div class="kelompok-item rounded pa-4" style="width: 100%">
          <p class="kelompok-sublabel mb-4">Ekonomi</p>
          <div class="d-flex flex-row justify-space-between">
            <div style="width: 50%" class="mr-4">
              <p class="mb-1 input-custom-label">Nilai</p>
              <v-text-field
                v-model="items.kelompokCLintas[7].nilai"
                label="0"
                solo
                hide-details
              />
            </div>
            <div style="width: 50%">
              <p class="mb-1 input-custom-label">Sikap</p>
              <v-select
                v-model="items.kelompokCLintas[7].sikap"
                :items="listSikap"
                label="Pilihan Sikap"
                solo
                hide-details
              />
            </div>
          </div>
        </div>
        <v-divider class="my-4" />
        <div class="kelompok-item rounded pa-4" style="width: 100%">
          <p class="kelompok-sublabel mb-4">Bahasa & Sastra Indonesia</p>
          <div class="d-flex flex-row justify-space-between">
            <div style="width: 50%" class="mr-4">
              <p class="mb-1 input-custom-label">Nilai</p>
              <v-text-field
                v-model="items.kelompokCLintas[8].nilai"
                label="0"
                solo
                hide-details
              />
            </div>
            <div style="width: 50%">
              <p class="mb-1 input-custom-label">Sikap</p>
              <v-select
                v-model="items.kelompokCLintas[8].sikap"
                :items="listSikap"
                label="Pilihan Sikap"
                solo
                hide-details
              />
            </div>
          </div>
        </div>
        <v-divider class="my-4" />
        <div class="kelompok-item rounded pa-4" style="width: 100%">
          <p class="kelompok-sublabel mb-4">Bahasa & Sastra Inggris</p>
          <div class="d-flex flex-row justify-space-between">
            <div style="width: 50%" class="mr-4">
              <p class="mb-1 input-custom-label">Nilai</p>
              <v-text-field
                v-model="items.kelompokCLintas[9].nilai"
                label="0"
                solo
                hide-details
              />
            </div>
            <div style="width: 50%">
              <p class="mb-1 input-custom-label">Sikap</p>
              <v-select
                v-model="items.kelompokCLintas[9].sikap"
                :items="listSikap"
                label="Pilihan Sikap"
                solo
                hide-details
              />
            </div>
          </div>
        </div>
        <v-divider class="my-4" />
        <div class="kelompok-item rounded pa-4" style="width: 100%">
          <p class="kelompok-sublabel mb-4">Bahasa Asing Lain</p>
          <div class="d-flex flex-row justify-space-between">
            <div style="width: 50%" class="mr-4">
              <p class="mb-1 input-custom-label">Nilai</p>
              <v-text-field
                v-model="items.kelompokCLintas[10].nilai"
                label="0"
                solo
                hide-details
              />
            </div>
            <div style="width: 50%">
              <p class="mb-1 input-custom-label">Sikap</p>
              <v-select
                v-model="items.kelompokCLintas[10].sikap"
                :items="listSikap"
                label="Pilihan Sikap"
                solo
                hide-details
              />
            </div>
          </div>
        </div>
        <v-divider class="my-4" />
        <div class="kelompok-item rounded pa-4" style="width: 100%">
          <p class="kelompok-sublabel mb-4">Antropologi</p>
          <div class="d-flex flex-row justify-space-between">
            <div style="width: 50%" class="mr-4">
              <p class="mb-1 input-custom-label">Nilai</p>
              <v-text-field
                v-model="items.kelompokCLintas[11].nilai"
                label="0"
                solo
                hide-details
              />
            </div>
            <div style="width: 50%">
              <p class="mb-1 input-custom-label">Sikap</p>
              <v-select
                v-model="items.kelompokCLintas[11].sikap"
                :items="listSikap"
                label="Pilihan Sikap"
                solo
                hide-details
              />
            </div>
          </div>
        </div>
      </div>
      <div class="table-border mb-6 rounded-lg pa-4">
        <p class="mb-6 kelompok-label">Ketidak Hadiran</p>
        <div class="kelompok-item rounded pa-4" style="width: 100%">
          <div class="d-flex flex-row justify-space-between">
            <div style="width: 33%" class="mr-4">
              <p class="mb-1 input-custom-label">Sakit</p>
              <v-text-field
                v-model="items.absen.sakit"
                label="0"
                solo
                hide-details
              />
            </div>
            <div style="width: 33%" class="mr-4">
              <p class="mb-1 input-custom-label">Izin</p>
              <v-text-field
                v-model="items.absen.izin"
                label="0"
                solo
                hide-details
              />
            </div>
            <div style="width: 33%">
              <p class="mb-1 input-custom-label">Tanpa Keterangan</p>
              <v-text-field
                v-model="items.absen.alpha"
                label="0"
                solo
                hide-details
              />
            </div>
          </div>
        </div>
      </div>
    </template>
    <div class="align-self-end">
      <v-btn
        @click="handleSubmit"
        :loading="loading"
        depressed
        color="primary"
        class="rounded-lg"
      >
        <p class="header-button-title ma-0">
          <span> Submit Data Nilai </span>
        </p>
      </v-btn>
    </div>
  </div>
</template>

<script>
const ContentNotFound = () => import("@/components/Content/NotFound");
import SiswaService from "@/services/resources/siswa.service";
import { SISWA, ALUMNI } from "@/router/name.types";
import { mapGetters } from "vuex";

export default {
  components: {
    ContentNotFound,
  },
  data() {
    return {
      loading: false,
      items: {
        NIS: "",
        NISN: "",
        nama_kelas: "",
        nama_siswa: "",
        kompetensi_id: null,
        kelompokA: [
          {
            mapel: "Pendidikan Agama Islam",
            nilai: "0",
            keterangan: "Sangat Buruk",
            sikap: "Baik",
          },
          {
            mapel: "PPKN",
            nilai: "0",
            keterangan: "Sangat Buruk",
            sikap: "Baik",
          },
          {
            mapel: "Bahasa Indonesia",
            nilai: "0",
            keterangan: "Sangat Buruk",
            sikap: "Baik",
          },
          {
            mapel: "Matematika",
            nilai: "0",
            keterangan: "Sangat Buruk",
            sikap: "Baik",
          },
          {
            mapel: "Sejarah Indonesia",
            nilai: "0",
            keterangan: "Sangat Buruk",
            sikap: "Baik",
          },
          {
            mapel: "Bahasa Inggris",
            nilai: "0",
            keterangan: "Sangat Buruk",
            sikap: "Baik",
          },
        ],
        kelompokB: [
          {
            mapel: "Seni Budaya",
            nilai: "0",
            keterangan: "Sangat Buruk",
            sikap: "Baik",
          },
          {
            mapel: "Penjaskes",
            nilai: "0",
            keterangan: "Sangat Buruk",
            sikap: "Baik",
          },
          {
            mapel: "Prakarya",
            nilai: "0",
            keterangan: "Sangat Buruk",
            sikap: "Baik",
          },
        ],
        kelompokC: [
          {
            mapel: "Matematika",
            nilai: "0",
            keterangan: "Sangat Buruk",
            sikap: "Baik",
          },
          {
            mapel: "Biologi",
            nilai: "0",
            keterangan: "Sangat Buruk",
            sikap: "Baik",
          },
          {
            mapel: "Fisika",
            nilai: "0",
            keterangan: "Sangat Buruk",
            sikap: "Baik",
          },
          {
            mapel: "Kimia",
            nilai: "0",
            keterangan: "Sangat Buruk",
            sikap: "Baik",
          },
          {
            mapel: "Geografi",
            nilai: "0",
            keterangan: "Sangat Buruk",
            sikap: "Baik",
          },
          {
            mapel: "Sejarah",
            nilai: "0",
            keterangan: "Sangat Buruk",
            sikap: "Baik",
          },
          {
            mapel: "Sosiologi",
            nilai: "0",
            keterangan: "Sangat Buruk",
            sikap: "Baik",
          },
          {
            mapel: "Ekonomi",
            nilai: "0",
            keterangan: "Sangat Buruk",
            sikap: "Baik",
          },
        ],
        kelompokCLintas: [
          {
            mapel: "Matematika",
            nilai: "0",
            keterangan: "Sangat Buruk",
            sikap: "Baik",
          },
          {
            mapel: "Biologi",
            nilai: "0",
            keterangan: "Sangat Buruk",
            sikap: "Baik",
          },
          {
            mapel: "Fisika",
            nilai: "0",
            keterangan: "Sangat Buruk",
            sikap: "Baik",
          },
          {
            mapel: "Kimia",
            nilai: "0",
            keterangan: "Sangat Buruk",
            sikap: "Baik",
          },
          {
            mapel: "Geografi",
            nilai: "0",
            keterangan: "Sangat Buruk",
            sikap: "Baik",
          },
          {
            mapel: "Sejarah",
            nilai: "0",
            keterangan: "Sangat Buruk",
            sikap: "Baik",
          },
          {
            mapel: "Sosiologi",
            nilai: "0",
            keterangan: "Sangat Buruk",
            sikap: "Baik",
          },
          {
            mapel: "Ekonomi",
            nilai: "0",
            keterangan: "Sangat Buruk",
            sikap: "Baik",
          },
          {
            mapel: "Bahasa Indonesia",
            nilai: "0",
            keterangan: "Sangat Buruk",
            sikap: "Baik",
          },
          {
            mapel: "Bahasa Inggris",
            nilai: "0",
            keterangan: "Sangat Buruk",
            sikap: "Baik",
          },
          {
            mapel: "Bahasa Asing Lain",
            nilai: "0",
            keterangan: "Sangat Buruk",
            sikap: "Baik",
          },
          {
            mapel: "Antropologi",
            nilai: "0",
            keterangan: "Sangat Buruk",
            sikap: "Baik",
          },
        ],
        absen: {
          alpha: "0",
          izin: "0",
          sakit: "0",
        },
      },
      siswa_id: this.$route.params.siswaId,
      kelas_id: this.$route.params.kelasId,
      semester: this.$route.query?.semester,
      kompetensi_id: this.$route.query?.kompetensi_id,
      listSikap: ["Sangat Buruk", "Buruk", "Sedang", "Baik", "Sangat Baik"],
    };
  },
  computed: {
    ...mapGetters(["getKompetensi"]),
    isUpdate() {
      return this.kompetensi_id;
    },
    isAvailable() {
      return this.items?.kompetensi_id;
    },
    isAlumni() {
      return this.$router.currentRoute?.name == ALUMNI.UPDATE_KOMPETENSI;
    },
  },
  methods: {
    convertKet(arg) {
      if (!arg) return "Belum Tersedia";
      else if (arg <= 20) return "Sangat Buruk";
      else if (arg >= 21 && arg <= 40) return "Buruk";
      else if (arg >= 41 && arg <= 60) return "Sedang";
      else if (arg >= 61 && arg <= 80) return "Baik";
      else if (arg >= 81) return "Sangat Baik";
    },
    handleBack() {
      this.$router.replace({
        name: this.isAlumni
          ? ALUMNI.TABEL_KOMPETENSI
          : SISWA.KELAS.SISWA.TABEL_KOMPETENSI,
        params: {
          siswaId: this.$route.params?.siswaId,
          kelasId: this.$route.params?.kelasId,
        },
      });
    },
    handleSubmit() {
      this.items.kelompokA.map(
        (e) => (e.keterangan = this.convertKet(e.nilai))
      );
      this.items.kelompokB.map(
        (e) => (e.keterangan = this.convertKet(e.nilai))
      );
      this.items.kelompokC.map(
        (e) => (e.keterangan = this.convertKet(e.nilai))
      );
      this.items.kelompokCLintas.map(
        (e) => (e.keterangan = this.convertKet(e.nilai))
      );

      const payload = {
        siswa_id: this.siswa_id,
        kelas_id: this.kelas_id,
        kompetensi_id: this.kompetensi_id,
        semester: this.semester,
        kelompokA: [...this.items.kelompokA],
        kelompokB: [...this.items.kelompokB],
        kelompokC: [...this.items.kelompokC],
        kelompokCLintas: [...this.items.kelompokCLintas],
        absen: { ...this.items.absen },
      };

      this.loading = true;
      SiswaService.addKompetensi(payload)
        .then(({ data: { data, message } }) => {
          if (data?.toLowerCase() == "success") {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: `Berhasil Menyimpan Data Kompetensi ${
                this.isAlumni ? "Alumni" : "Siswa"
              }`,
              color: "success",
            });
            this.$router.push({
              name: this.isAlumni
                ? ALUMNI.TABEL_KOMPETENSI
                : SISWA.KELAS.SISWA.TABEL_KOMPETENSI,
              params: {
                siswaId: this.$route.params?.siswaId,
                kelasId: this.$route.params?.kelasId,
              },
            });
          } else {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message:
                message ||
                `Gagal Menyimpan Data Kompetensi ${
                  this.isAlumni ? "Alumni" : "Siswa"
                }`,
              color: "error",
            });
          }
        })
        .catch((err) => {
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: `Gagal Menyimpan Data Kompetensi ${
              this.isAlumni ? "Alumni" : "Siswa"
            }`,
            color: "error",
          });
          console.error(err);
        })
        .finally(() => (this.loading = false));
    },
    getDetail() {
      this.loading = true;
      SiswaService.getKompetensi({
        siswa_id: this.siswa_id,
        kelas_id: this.kelas_id,
        semester: this.semester,
      })
        .then(({ data: { code, data, message } }) => {
          if (code == 200) {
            this.items.kompetensi_id = data.kompetensi_id;
            this.items.kelompokA = [...data.kelompokA];
            this.items.kelompokB = [...data.kelompokB];
            this.items.kelompokC = [...data.kelompokC];
            this.items.kelompokCLintas = [...data.kelompokCLintas];
            this.items.nama_kelas = data.namaKelas;
            this.items.absen = {
              ...data.absen,
            };
          } else {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message:
                message ||
                `Gagal Memuat Data Kompetensi ${
                  this.isAlumni ? "Alumni" : "Siswa"
                }`,
              color: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: `Gagal Memuat Data Kompetensi ${
              this.isAlumni ? "Alumni" : "Siswa"
            }`,
            color: "error",
          });
        })
        .finally(() => (this.loading = false));
    },
  },
  mounted() {
    this.kompetensi_id && this.getDetail();
  },
};
</script>

<style scoped>
.kelompok-label {
  font-family: "Poppins";
  font-size: 16px;
  font-style: normal;
  font-weight: 500 !important;
  line-height: 30px;
  letter-spacing: 0em;
  text-align: left;
}

.kelompok-sublabel {
  color: #646464;
  font-family: "Poppins";
  font-size: 16px;
  font-style: normal;
  font-weight: 500 !important;
  line-height: 30px;
  letter-spacing: 0em;
  text-align: left;
}

.kelompok-item {
  background-color: #f4f4f4;
}

.input-custom-label {
  color: #646464;
  font-family: "Montserrat";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 34px;
  letter-spacing: 0.75px;
  text-align: left;
}
</style>
