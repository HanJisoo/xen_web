import com.daou.xenmanager.XenManagerApplication;
import com.daou.xenmanager.controller.MainController;
import com.daou.xenmanager.domain.XenObject;
import com.daou.xenmanager.service.XenService;
import org.junit.FixMethodOrder;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;


import org.springframework.ui.ModelMap;
import org.springframework.web.servlet.ModelAndView;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.mockito.BDDMockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

import java.util.ArrayList;

/**
 * Created by user on 2016-12-15.
 */
@Ignore
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MainController.class, webEnvironment= SpringBootTest.WebEnvironment.RANDOM_PORT)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class XenWebServiceTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private XenService service;

    @Test
    public void getListTest() throws Exception{
        ModelAndView mav = new ModelAndView("list", new ModelMap());
        ArrayList<XenObject> list = new ArrayList<>();
        list.add(new XenObject("name", "uuid"));
        list.add(new XenObject("name", "uuid"));
        mav.addObject("list", list);
        given(service.getListFromSTAFByType("vm")).willReturn(list);
        mvc.perform(get("/xen/list").accept(MediaType.TEXT_PLAIN)).andExpect(status().isOk()).andExpect(content().contentType(MediaType.ALL));

    }
}
