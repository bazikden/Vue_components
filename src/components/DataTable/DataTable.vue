<template>
  <div class="container">
    <h3>Фазы</h3>
    <el-table-draggable  :animate="300">
      <el-table :data="phases" border style="width: 100%" empty-text="Нет данных">
        <el-table-column label="Название">
          <template slot-scope="scope">
            <el-input v-if="editPhasesIndex === scope.$index" v-model="scope.row.name" />
            <span v-else>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column width="100" align="center" label="Часы">
          <template slot-scope="scope">
            <el-input v-if="editPhasesIndex === scope.$index" v-model="scope.row.hours" />
            <span v-else>{{scope.row.hours}}</span>
          </template>
        </el-table-column>
        <el-table-column width="100" align="center" label="Подфазы" prop="phases.length"></el-table-column>
        <el-table-column width="200" align="center" label="Редактировать">
          <template slot-scope="scope">
            <el-button
              v-if="editPhasesIndex !== scope.$index"
              size="mini"
              @click="handleEditPhases(scope.$index, scope.row)"
            >Edit</el-button>
            <el-button v-else size="mini" type="success" @click="handleUpdatePhases()">Update</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDeletePhases(scope.$index, scope.row)"
            >Delete</el-button>
          </template>
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            <draggable @start="onDragStart" @end="onDragEnd" v-model="props.row.phases">
              <transition-group>
                <div v-for="(phase,index) in props.row.phases" :key="phase.name + index">
                  <el-row class="subphasa-row" :span="24">
                    <el-row style="display:flex;align-tems:center">
                      <el-col
                        v-if="editSubphasesIndex.index === index && editSubphasesIndex.phaseIndex === props.$index"
                        :span="20"
                      >
                        <div style="display:flex;align-items:center">
                          <label>Название</label>
                          <el-input v-model="phase.name" />
                          <label>Часы</label>
                          <el-input style="width:100px" v-model="phase.hours" />
                        </div>
                      </el-col>
                      <el-col v-else :span="20">
                        <span style="font-size:18px">{{phase.name}}</span>
                        <span v-if="+phase.hours > 0">({{phase.hours}} часов)</span>
                      </el-col>
                      <el-col  :span="4" class="edit-subphase-btns">
                        <el-button
                          v-if="editSubphasesIndex.index === index && editSubphasesIndex.phaseIndex === props.$index"
                          size="mini"
                          type="success"
                          @click="handleUpdateSubPhases(index,props.$index,phase)"
                        >Update</el-button>
                        <el-button
                          v-else
                          size="mini"
                          @click="handleEditSubPhases(index,props.$index)"
                        >Edit</el-button>
                        <el-button size="mini" type="danger">Delete</el-button>
                      </el-col>
                    </el-row>
                    <el-row>
                      <div
                        style="padding: 0 10px"
                        v-if="editSubphasesIndex.index === index && editSubphasesIndex.phaseIndex === props.$index"
                      >
                        <p style="margin-top:20px">Описание</p>
                        <el-input type="textarea" :rows="2" v-model="phase.description" />
                      </div>

                      <div v-else style="padding-left:20px;" v-html="phase.description"></div>

                    </el-row>
                  </el-row>
                </div>
              </transition-group>
            </draggable>
          </template>
        </el-table-column>
      </el-table>
    </el-table-draggable>
  </div>
</template>

<script>
const phases = [
  {
    name: "Фаза 1",
    hours: "30",
    description: "",
    phases: [
      {
        name: "Подфаза 1.1",
        hours: "30",
        description: "<div>Пункт 1</div> <div>Пункт 2</div> <div>Пункт 3</div>",
      },
      {
        name: "Подфаза 1.2",
        hours: "10",
        description: "<div>Пункт 1</div> <div>Пункт 2</div> <div>Пункт 3</div>",
      },
    ],
  },
  {
    name: "Фаза 2",
    hours: "6",
    description: "",
    phases: [
      {
        name: "Подфаза 2.1",
        hours: "30",
        description: "<div>1<div> <div>1<div> <div>1<div>",
      },
    ],
  },
];

import ElTableDraggable from "element-ui-el-table-draggable";
import draggable from "vuedraggable";
export default {
  name: "DataTable",
  components: { ElTableDraggable, draggable },
  data: () => ({
    editPhasesIndex: -1,
    editSubphasesIndex: {
      phaseIndex: -1,
      index: -1,
    },
    editedSubPhaseValues: {
      name: "",
      hours: "",
      description: "",
    },
    phases,
  }),
  watch: {
    phases: function (data) {
      this.$emit("update-data", data);
      console.log(data);
    },
  },
  methods: {
    handleDeletePhases(index, row) {
      this.$set(
        this,
        "phases",
        this.phases.filter((phase) => phase.name !== row.name)
      );
      console.log(index, row);
    },
    handleEditPhases(index, row) {
      this.editPhasesIndex = index;
      console.log(index, row);
    },
    handleUpdatePhases() {
      this.editPhasesIndex = -1;
    },
    handleEditSubPhases(index, phaseIndex) {
      this.editSubphasesIndex = {
        phaseIndex,
        index,
      };
    },
    handleUpdateSubPhases() {
      this.editSubphasesIndex = -1;
    },
    onNameChange(event) {
      console.log("event", event);
    },
    log(data) {
      console.log(data);
    },
    onDragStart(event){
      console.log("start",event)
    },
    onDragEnd(event){
      console.log("end",event)
    }
  },
};
</script>

<style lang="scss" scoped>
h3 {
  text-align: center;
  padding: 20px 0;
}
.edit-subphase-btns {
  text-align: center;
}
label {
  padding: 0 10px;
}
.subphasa-row {
  margin: 10px 0;
  padding: 20px;
  &:hover {
    cursor: pointer;
    background: #cccccc;
  }
  .edit-subphase-btns{
    display: flex;
    align-items: center;
    padding: 0 10px;
  }
}
</style>