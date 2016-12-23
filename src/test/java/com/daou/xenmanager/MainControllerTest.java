package com.daou.xenmanager;

import com.daou.xenmanager.XenManagerApplication;
import com.daou.xenmanager.controller.MainController;
import com.daou.xenmanager.domain.XenObject;
import com.daou.xenmanager.service.XenService;
import com.daou.xenmanager.util.STAFStatus;
import com.ibm.staf.STAFResult;
import org.apache.commons.lang3.RandomStringUtils;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;

import static org.mockito.BDDMockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.assertj.core.api.Assertions.*;

/**
 * Created by user on 2016-12-20.
 */
@RunWith(SpringRunner.class)
@WebMvcTest(MainController.class)
public class MainControllerTest {
    private String vmName, snapName, vmUuid, snapUuid;

    @Autowired
    private MockMvc mvc;

    @MockBean
    private XenService xenService;

    @Before
    public void initVar(){
        vmName = RandomStringUtils.randomAlphanumeric(10);
        vmUuid = RandomStringUtils.randomAlphanumeric(15);
        snapName = RandomStringUtils.randomAlphanumeric(10);
        snapUuid = RandomStringUtils.randomAlphanumeric(15);
    }

    @Test
    public void 리스트_테스트() throws Exception{
        ArrayList<XenObject> list = new ArrayList<>();
        list.add(new XenObject(RandomStringUtils.randomAlphanumeric(10), RandomStringUtils.randomAlphanumeric(15)));
        given(xenService.getListFromSTAFByType(anyString())).willReturn(list);
        mvc.perform(get("/xen/list")
                .accept(MediaType.TEXT_PLAIN))
                .andExpect(status().isOk())
                .andExpect(view().name("list"))
                .andExpect(model().attributeExists("result"))
                .andExpect(model().attributeExists("list"))
                .andExpect(model().attributeExists("type"));
    }

    @Test
    public void addVMBySnapshotTest() throws Exception{
        STAFStatus status = new STAFStatus("test", "success");
        given(xenService.addVMBySnapshot(anyString(), anyString(), anyString())).willReturn(status);
        mvc.perform(get("/xen/add", vmName, snapUuid, snapName)
                .accept(MediaType.TEXT_PLAIN))
                .andExpect(status().isOk())
                .andExpect(view().name("add"))
                .andExpect(model().attributeExists("result"));
    }
}
