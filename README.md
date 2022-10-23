# Freely 
### 「きっちりしすぎない旅行計画表」作成サービス<br />
- 目的地ベースの大まかな計画だけ立てたい人へ<br />
- 旅行メンバー間でリアルタイムに共同編集<br />
- 旅先の天気・コロナ・地酒情報を一元取得

[トップページはこちら](https://freely-azure.vercel.app/) <br />
[旅行プランのサンプルはこちら](https://freely-azure.vercel.app/3db85a60-e343-44f4-8778-dce6ff194996/plan)

<br />

## 👨‍💻 画面イメージ(MacBookPro, iPhone12Pro)
<img src="https://user-images.githubusercontent.com/97160510/197401166-92b75966-c118-43d2-b68e-d11c6e1e8f98.png" />
<img src="https://user-images.githubusercontent.com/97160510/197407583-b1369f8c-8cc5-4d94-9555-65b4b9da1a3c.jpg" />
<br />

## 💭 作成の背景
### 旅行計画サービスで「計画疲れ」した自身の経験から、もっと手軽に・もっとざっくりとした計画を作りたいと感じたから

### ① 自身の経験から感じた旅行計画の課題
1. 複数人旅行をした際、予め計画を立てておく必要があった
2. しかし、煩雑なフォーム入力による「計画疲れ」や、細かな時間指定による「旅行当日の窮屈さ」を感じた
3. <u>→「もっと手軽に、もっとざっくりとした計画を作りたい！」<u/>

### ② コンセプトの策定
1. 友人へヒアリング、同じ思いを持つ大学生が多いと分かる
2. また「LINEのグループチャットなどで、簡易的な計画だけを立てて旅行している」大学生が多かった
3. →「簡易的な計画をゆるくワイワイ立てられるサービス」は大学生に需要がありそう

### ③ 「ユーザーの手軽さ」を最大限に意識
1. 「LINEのグループチャット」で完結させない、「Freely」を選んでもらうための工夫が必要
2. 「手軽さ・シンプルさ」にこだわり、利用の敷居を引き下げることを意識
3. 余分な機能は持たない、ストレスフリーなサービス
<br />

## 🏗 使用技術
<img src="https://user-images.githubusercontent.com/97160510/197398576-e0150a21-61ca-4b86-a705-9d64e55d375c.png" width="600px" />

|領域|用途|使用技術|
|:---:|:---:|:---:|
|フロントエンド|言語・FW <br /> UI <br /> Deploy|TypeScript, React, Next.js <br /> TailwindCSS, Mantine <br /> Vercel|
|バックエンド|言語・FW <br /> ORM <br /> Deploy <br /> 環境構築|Python, FastAPI <br /> SQLAlchemy <br /> Heroku(PostgreSQL) <br /> Docker(FastAPI公式Image)|
|周辺技術|デザイン <br /> BFF・プロキシサーバ <br /> フェッチ・ポーリング <br /> 状態管理 <br />　エラーUI <br /> 画像トリミング <br />　グラフ描画 <br />　QRコード <br />　アイコン <br />　リンター / フォーマッター |Figma <br /> Node.js (Next.js API Route) <br /> SWR <br /> Recoil <br /> react-error-boundary <br /> react-easy-crop <br /> react-chartjs-2 <br /> next-qrcode <br /> tabler-icons, react-icons <br /> ESLint / Prettier |
<br />

## 💡 工夫点
- 全て設計を済ませてから制作を開始した
  - 序盤から全体の構成を意識できたことでテンポ良く開発できた
  - 機能に優先順位を設け、スモールスタートな開発ができた
  - [アプリ概要 - Notion](https://amenable-baboon-e1b.notion.site/Freely-f2f9d150b23d42afb33c21a18f475fe8)
  - [デザインカンプ - Figma](https://www.figma.com/file/UsUwiM4XaHEgbjWmwBosjR/Freely?node-id=0%3A1)
- コードのリーダビリティを意識
  - ディレクトリ構成を見直し
  - コンポーネントの密結合を避ける
  - 適切なコメントを挟む
- パフォーマンス
  - SSG, ISR　による高速なページ表示
  - 関数、コンポーネントをメモ化
<br />

## 🚧　今後の改善案
- UXを向上させる
  - ISRページは、GASのbotでページを自動巡回・生成させる
  - ポップオーバーを使用し、ページ遷移回数を削減する
  - GoogleMapのAPIでスポット名のサジェスト入力を実装
  - ダークモード対応
- より良い設計を目指す
  - データ取得方法をポーリング→WebSocket
  - Heroku有料化のため、Firebase/Supabaseへ移行させる
  - テストツールを導入する
