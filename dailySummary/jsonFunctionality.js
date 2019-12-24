exports.jsonFunctionality = function (result) {
    return new Promise((resolve, reject) => {
        console.log('jsonFunctionality result-->', result);
        var object = Array.from(result);

        try {
            let array = [];
            let cataraay = [];
            let part;
            let policyarray = [];
            let partnername;
            let policyarra = []
            let policy;
            let cats
            for (let i = 0; i < object.length; i++) {

                if (i != 0) {
                    if (object[i].partner_name == object[i - 1].partner_name) {
                        console.log("partner match" + object[i].partner_name + "==" + object[i - 1].partner_name);
                        if (object[i].policycategory == object[i - 1].policycategory) {
                            console.log("category match" + object[i].policycategory + "==" + object[i - 1].policycategory);

                            policy = {

                                "policy_name": object[i].policy_title,
                                "policy_count": object[i].policy_count,
                                "policy_gta_amount": object[i].gta_amount,
                                "policy_daily_count": object[i].policy_daily_count,
                                "gta_daily_amount": object[i].gta_daily_amount

                                // "ptitle": object[i].policy_title,
                                // "pcount": object[i].policy_count,
                                // "gmtcount": object[i].policy_daily_count
                            }
                            policyarra.push(policy);

                        } else {
                            console.log("category unmatch" + object[i].policycategory + "==" + object[i - 1].policycategory);
                            policyarra = [];
                            policy = {
                                "policy_name": object[i].policy_title,
                                "policy_count": object[i].policy_count,
                                "policy_gta_amount": object[i].gta_amount,
                                "policy_daily_count": object[i].policy_daily_count,
                                "gta_daily_amount": object[i].gta_daily_amount
                            }
                            policyarra.push(policy);

                            cats = {
                                "policy_cat_name": object[i].policycategory,
                                "policy": policyarra
                            }
                            cataraay.push(cats);

                        }


                    } else {
                        console.log("partner unmatch" + object[i].partner_name + "==" + object[i - 1].partner_name);
                        policyarra = [];
                        cataraay = [];
                        partnername = object[i].partner_name;
                        policy = {
                            "policy_name": object[i].policy_title,
                            "policy_count": object[i].policy_count,
                            "policy_gta_amount": object[i].gta_amount,
                            "policy_daily_count": object[i].policy_daily_count,
                            "gta_daily_amount": object[i].gta_daily_amount
                        }
                        policyarra.push(policy);

                        cats = {
                            "policy_cat_name": object[i].policycategory,
                            "policy": policyarra
                        }
                        cataraay.push(cats);
                        part = {
                            "partnername": partnername,
                            "categoryname": cataraay
                        }
                        array.push(part)

                    }
                } else {
                    console.log("0 entry" + object[i].partner_name);

                    partnername = object[i].partner_name;
                    policy = {
                        "policy_name": object[i].policy_title,
                        "policy_count": object[i].policy_count,
                        "policy_gta_amount": object[i].gta_amount,
                        "policy_daily_count": object[i].policy_daily_count,
                        "gta_daily_amount": object[i].gta_daily_amount
                    }
                    policyarra.push(policy);

                    cats = {
                        "policy_cat_name": object[i].policycategory,
                        "policy": policyarra
                    }
                    cataraay.push(cats);
                    part = {
                        "partnername": partnername,
                        "categoryname": cataraay
                    }
                    array.push(part)

                }

            }
            console.log('array--->', JSON.stringify(array));
            resolve(array);
        } catch (error) {
            console.log('error is-->', error);
            console.log('error in jsonFunctionality.js catch block');
            db.dbend();
        }
    });
}

