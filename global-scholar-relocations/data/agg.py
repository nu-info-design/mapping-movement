import pandas as pd

def process_migration_data(input_file, output_file):
    # 读取CSV文件
    print(f"正在读取文件: {input_file}")
    df = pd.read_csv(input_file)
    
    # 只保留指定的列
    columns_to_keep = [
        'n_migrations', 'year', 'countrynamefrom', 'countrynameto', 
        'regionfrom', 'regionto', 'iso3codefrom', 'iso3codeto'
    ]
    
    # 检查所有列是否存在
    for col in columns_to_keep:
        if col not in df.columns:
            print(f"警告: 列 '{col}' 在输入文件中不存在")
    
    # 只保留存在的列
    existing_columns = [col for col in columns_to_keep if col in df.columns]
    df = df[existing_columns]
    
    print(f"保留的列: {existing_columns}")
    print(f"处理前行数: {len(df)}")
    
    # 按照countrynamefrom、countrynameto和year分组，并将n_migrations列的值求和
    if 'n_migrations' in df.columns and 'countrynamefrom' in df.columns and 'countrynameto' in df.columns and 'year' in df.columns:
        # 定义聚合方式：n_migrations求和，其他列保留第一个值
        agg_dict = {'n_migrations': 'sum'}
        
        # 对其他列使用'first'聚合方式
        for col in df.columns:
            if col not in ['n_migrations', 'countrynamefrom', 'countrynameto', 'year']:
                agg_dict[col] = 'first'
        
        # 执行分组和聚合
        df = df.groupby(['countrynamefrom', 'countrynameto', 'year']).agg(agg_dict).reset_index()
        print(f"处理后行数: {len(df)}")
    else:
        print("警告: 无法执行合并操作，缺少必要的列")
    
    # 保存到新文件
    df.to_csv(output_file, index=False)
    print(f"已保存处理后的数据到: {output_file}")

if __name__ == "__main__":
    input_file = "/merged.csv"
    output_file = "/real.csv"
    process_migration_data(input_file, output_file)