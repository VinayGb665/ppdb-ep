import os
import json
import pprint 
pp = pprint.PrettyPrinter(indent=4)


# Move to parent dir
cwd= os.getcwd()
cwd="/".join(cwd.split("/")[:-1])
json_dir=cwd+"/scraped_data_info"

with open(json_dir+"/company_filenames.json") as f:
    comp_data = json.load(f)


with open(json_dir+"/tags_filenames.json") as f:
    tags_data = json.load(f)



# Given company name (eg 'PayPal IDC' ) 
# returns list of filenames ( ['PayPal IDC_1.txt', 'PayPal IDC_2.txt',..... 'PayPal IDC_14.txt'])
def GetFilenameForCompany(company_name):
	return comp_data[company_name]


print("Total number of tags : ",len(list(tags_data.keys())))


#Given tag name (eg : 'Arrays')
# returns list of filenames ( [['Amazon_3.txt', 'Amazon_13.txt', ........ ,  'Quickr_12.txt', 'On-Campus_151.txt'] )
def GetFilenameForTag(tag_name):
	return tags_data[tag_name]

